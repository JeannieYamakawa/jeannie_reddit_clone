var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('./db/knex');
var ejs = require('ejs');

app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));


// “/” is the static about or home page (POST USERS)
// app.get('/', function(req, res) {
//     //'should display our signup homepage'
//   res.send('send is working')
// });
//
app.post('/users/new', function(req, res) {
    //'should post new user to users table on database
    var username = req.body;
       console.log("post received:" , username);
       //should redirect to page of all posts
    // knex.insert(req.body).into('username')
    res.redirect('/users')


});

app.get('/users/new', function(req, res) {
    knex('users').then(function(data){
        console.log(data, "data returned from table")
        res.render('statics/home')
        // res.send(data)
    })
    // // 'should display all users'

})


// app.get('/', function(req, res){
//     res.render('statics/home')
// })


// app.put('/users/:id', function(req, res) {
//     // should be able to edit specific user
//   res.send('specific user ID')
// });
//
//
//
// app.delete('/users/:id', function(req, res) {
//     // 'should delete selected user'
//
// });
//
//
//
// app.get('/users/new', function(req, res) {
//     //'should take us to add new users page
//     res.send('new users page')
// });
//
// app.post('/users/new', function(req, res) {
//     res.redirect('/users')
//     //'should add a new user and redirect to users page
//   res.send('bob')
// });
//
//
// // “/posts” (list all posts page & homepage for signed-up user….. GET POSTS--will fs.read all posts from database. DELETE POSTS will fs.read from DB and fs.write to delete, also GET COMMENTS, POST COMMENTS, PUT COMMENTS, DELETE COMMENTS)
// app.get('/posts', function(req, res) {
//     //'should take us to display of all posts
//     //should have capability to comment
//     res.send('posts page')
// });
// app.put('/posts/:id', function(req, res) {
//     //'should take us to the specific post's link
//     res.send('posts page')
// });
// app.delete('/posts/:id', function(req, res) {
//     //'should take us to the specific post
//     //should have capability to delete post
//     res.send('posts page')
// });
//



//should have capability to edit post
// “/posts/new” (make new post page…...GET POSTS--will res.render the new posts HTML page, POST POSTS--will fs.write to database)
// “/posts/update” (similar to comments page in that it displays the post. GET POSTS--will fs.read specific post )
// “/posts/:id” (displays post text with that ID and another form)






app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
