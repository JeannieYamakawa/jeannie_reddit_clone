var port = process.env.PORT || 3000;
// var port = process.env.NODE_ENV || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var knex = require('./db/knex');


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', function(req, res) {
    //'should display our signup homepage'
  res.send('send is working')
});



app.get('/users', function(req, res) {
    // 'should display all users'
  res.send('send is working')
});

app.get('/users/:id', function(req, res) {
  res.send('specific user ID')
});



app.post('/users/new', function(req, res) {
    //'should take us to new users page'
    res.redirect('/users')
    //'should add a new user'
  res.send('bob')
});




app.listen(port, function(){
    console.log("server is listening!")
})

module.exports = app;
