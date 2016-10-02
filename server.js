var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('./db/knex');
var ejs = require('ejs');
var methodOverride = require('method-override')

app.set("view engine", "ejs"); //by default is looking for /views/
//  one single / before path means "start from server root"
// app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'))

////////////////////////////////////////////////////////////////////////////////////
//posts is the homepage, so it also goes to /posts
app.get('/', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', {myPosts:data})
    })
})

//the line below says if user sends a GET request to this path, do this thing.
app.get('/users/new', function(req, res) {
    // 'displays sign up form'
    res.render('users/usersnew');
})

// READ/see all users
app.get('/users', function(req,res){
    //displays all users
    knex('users').then(function(data){
        var myUsers = JSON.stringify(data)
        res.render('users/usersindex', {username: data})
    })
})

// CREATE a user. posts new user to users table on database
app.post('/users', function(req, res) {
    var newUsersName = req.body;  // (make sure you have body parser)
    var arrayOfUsers = [];
    knex('users').then(function(data){
        console.log(data)
        data.forEach(function(item){
            arrayOfUsers.push(item.username) })
            console.log(arrayOfUsers)
            var newUser = newUsersName.username
            if (arrayOfUsers.indexOf(newUser)){
            knex('users').insert(newUsersName).then(function(err){
                res.redirect('/users')
            })
        }else{
            res.send("Error: This user already exists. Please go back and create a unique username.")
        }
    })
});

//DELETE a user
app.delete('/users/:username', function(req,res) {
    var userToDelete = req.params.username;
    knex('comments').where('by_username', userToDelete).del()
    .then(knex('posts').where('username', userToDelete).del()
    .then(knex('users').where('username', userToDelete).del()
    .then(function(){
        res.redirect('/users')
        })
        )
    )
});



//CREATE new posts
app.get('/posts/new', function(req, res) {
    res.render('posts/postsnew')
})

//will post to posts table in db from form on posts/new page
app.post('/posts', function(req,res){
    var wholePost = req.body;
    var username = req.body.username;
    var arrayOfUsers = [];
    knex('users').then(function(data){
    data.forEach(function(item){
        arrayOfUsers.push(item.username)
    })
    if (arrayOfUsers.indexOf(username)== -1){
        res.render('posts/postsindex', {myError: "Error: This user does not exist. Please create a username or make a post as one of the existing users below.", myUsers: arrayOfUsers})
    }
    else{
        if(wholePost.content_link.indexOf("http")==-1){
            wholePost.content_link = "http://" + wholePost.content_link;
            if(wholePost.content_link.indexOf(".com")==-1){
                wholePost.content_link = wholePost.content_link + ".com" ;
            }
        }
    knex('posts').insert(wholePost).then(function(err){
            res.redirect('/posts')
            })
         }
    })
})

//READ/display all posts
app.get('/posts', function(req,res){
    knex('posts').then(function(data){
        // console.log(data);
    res.render('posts/postsindex', {myPosts:data})
    })
})

//READ/display a specific post
app.get('/posts/:id', function(req,res){
    var postTitle = req.params.id
    knex('posts').where('id','=', postTitle).then(function(data){
        var myPost = data[0];
        res.render('posts/postsshow', {myPost:myPost})
    // res.send(data)
    })
})

//DELETE posts
app.delete('/posts/:id', function(req,res) {
    var postToDelete = req.params.id;
    knex('comments').where('post_id', postToDelete).del()
        .then(knex('posts').where('id', postToDelete).del()
        .then(function(){
            res.redirect('/posts')
        })
        )
});












// CREATE comments; displays a specific post and form to comment on that post
app.get('/posts/:id/comments/new', function(req,res){
    var postId = req.params.id;
    console.log(postId, "***postTitle")
        knex('comments').where('post_id', postId).then(function(data){
        res.render('comments/commentsnew', {myPosts:data})
    // res.send(data)
    })
})

// posts new COMMENT to specific post in POSTS table, info from form on posts/show/:id page
app.post('/posts/:id', function(req, res){
    var wholeComment = req.body;
    var iD = req.body.post_id;
    console.log(wholeComment)
    var postId = req.params.id;
    knex('comments').where('post_id', postId)
    .insert(wholeComment).then(function(){
        res.redirect('/posts/'+iD+'/comments')
    })
})


//READ all comments for a specific post
app.get('/posts/:id/comments', function(req,res){
    var postId = req.params.id;
    knex('posts').innerJoin('comments', 'posts.id', 'comments.post_id').then(function(data){
        // var myComments = JSON.stringify(data);
        var specificPostComments = [];
        for (var i = 0; i < data.length; i++){
            if(data[i].post_id == postId){
                specificPostComments.push(data[i])
            }
        }
        console.log(specificPostComments, "all comments matching")
    res.render('comments/commentsedit', {myPostComments: specificPostComments})
// res.send(specificPostComments)
})
})

//DELETE a comment on a specific post
app.delete('/posts/:id/comments/:iD', function(req,res){
    var postId = req.params.id
    var commentId = req.params.iD;
    knex('comments').where({id: commentId, post_id: postId}).del()
    .then(function(){
        res.redirect('/posts/'+postId+'/comments')
    })
    // res.send("comments delete is working")
})







app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
