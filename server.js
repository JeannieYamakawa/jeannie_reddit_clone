var port = process.env.NODE_ENV || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('.knexfile')[process.end.NODE_ENV]
var knex = require('knex')(config);

app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
// app.use(morgan("tiny"));
// app.use(bodyParser.urlencoded({extended:true}));





app.get('/', function(req, res) {
  res.send('send is working')
});



app.get('/users', function(req, res) {
  res.send('send is working')
});



app.get('/users/new', function(req, res) {

  res.send('sign up')
});




app.listen(port, function(){
    console.log("port is listening!")
})

module.exports = app;
