var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('./db/knex');
var ejs = require('ejs');
var methodOverride = require('method-override')


app.set("view engine", "ejs"); //by default is looking for a folder called views
// app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


//USE METHOD OVERRIDE TO DELETE OR SEND AJAX REQUEST TO DELETE

////////////////////////////////////////////////////////////////////////////////////
//posts is the homepage, so / also goes to /posts
app.get('/', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', {myPosts:data})
    })
})

//the line below says if user sends a get request to this path, do this thing.
app.get('/users/new', function(req, res) {
    // 'displays sign up form'
    res.render('users/usersnew');
})

app.get('/users', function(req,res){
    //displays all users
    knex('users').then(function(data){
        var myUsers = JSON.stringify(data)
        res.render('users/usersindex', {username: data})
    })
})

app.post('/users', function(req, res) {
    //should post new user to users table on database
    var newUsersName = req.body;  // (make sure you have body parser)
    // insert new user from req.body in to db
    knex('users').insert(newUsersName).then(function(err){
        // redirect to index page
        res.redirect('/users')
    })
});
////////////////////////////////////////////////////////////////////////////////////
//display all posts
app.get('/posts', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', {myPosts:data})
    })
})

    // 'displays all posts
app.get('/posts/new', function(req, res) {
    res.render('posts/postsnew')
})

//post to posts column in database from form on posts/new page
app.post('/posts', function(req,res){
    var wholePost = req.body;
    var username = req.body.username;
    console.log(username)
    var arrayOfUsers = [];
    knex('posts').then(function(data){
        console.log(data)
    data.forEach(function(item){
        arrayOfUsers.push(item.username)
    })
    if (arrayOfUsers.indexOf(username)== -1){
        res.render('posts/postsindex', {myError: "This user does not exist."})
    }
    else{
        console.log(wholePost.content_link)
        if(wholePost.content_link.indexOf("http")==-1){
            wholePost.content_link = "http://" + wholePost.content_link;
            if(wholePost.content_link.indexOf(".com")==-1){
                    wholePost.content_link =  wholePost.content_link + ".com";
                }
        }
    knex('posts').insert(wholePost).then(function(err){
            res.redirect('/posts')
            })
         }
    })
})




//display a specific post
app.get('/posts/:id', function(req,res){
    var postTitle = req.params.id
    knex('posts').where('id','=', postTitle).then(function(data){
        var myPost = data[0];
        res.render('posts/postsshow', {myPost:myPost})
    // res.send(data)
    })
})
//display all comments for a specific post
app.get('/posts/:id/comments', function(req,res){
    var postTitle = req.params.id
    knex('posts').where('id','=', postTitle).innerJoin('comments', 'comments.post_id', 'posts.id').then(function(data){
    res.render('posts/show', {myPosts:data})
})
})


////////////////////////////////////////////////////////////////////////////////////
//** displays form to comment on a specified post
app.get('/comments/new', function(req,res){
    var postTitle = req.body;
    console.log(postTitle)
        knex('posts').where('id','=', postTitle).then(function(data){
            console.log(data, "this is the posts data")
        // res.render('comments/commentsnew', {myPosts:data})
    res.send(data)
    })
})










































app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
