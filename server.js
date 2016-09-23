var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('./db/knex');
var ejs = require('ejs');

app.set("view engine", "ejs"); //by default is looking for a folder called views
// app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));

//USE METHOD OVERRIDE TO DELETE OR SEND AJAX REQUEST TO DELETE

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

app.get('/posts', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', {myPosts:data})
    })
})
//posts is the homepage, so / also goes to /posts
app.get('/', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', {myPosts:data})
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




app.post('/posts', function(req,res){
    var postTitle = req.body;
    knex('posts').insert(postTitle).then(function(err){
        res.redirect('/posts')
    })
})

app.get('/posts/new', function(req, res) {
    // 'displays all posts'
    res.render('posts/postsnew')
})







































app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
