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


//if user sends a get request to this route, do this thing.
app.get('/users/new', function(req, res) {
    // 'displays sign up form'
    res.render('users/usersnew');
})

app.get('/users', function(req,res){
    knex('users').then(function(data){
        var myUsers = JSON.stringify(data)
        res.render('users/usersindex', {username: data})
    })
})

app.post('/users', function(req, res) {
    //'should post new user to users table on database

    var newUsersName = req.body  // (make sure you have body parser)
    // insert new user from req.body in to db
    knex('users').insert(newUsersName).then(function(err){
        // redirect to index page
        res.redirect('/users')
    }) // check docs
});

app.get('/posts', function(req,res){
    knex('posts').then(function(data){
    res.render('posts/postsindex', data)
})
})


app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
