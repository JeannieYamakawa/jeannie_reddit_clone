var app = require('../server');
var request = require('supertest');
var mocha = require('mocha');
var expect = require('chai').expect;
var config = require('.knexfile')['test']
var knex = require('knex')(config);


describe('GET /', function() {
  it('should display our proper text', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err,res){
          expect(res.text).to.equal('send is working')
          done()
      })
  });
});


describe('GET /users', function() {
  it('should display all users', function(done) {
    request(app)
      .get('/users/new')
      .end(function(err, res) {
        if(err) return done(err);
        expect(res.text).to.equal('send is working')
        done()
      })
      // .expect(200, done);
  });
});


  describe('GET /users/new', function() {
    it('should take us to new users page', function(done) {
      request(app)
        .get('/users/new')
        .end(function(err,res) {
          if(err) return done(err);
          expect(res.text).to.include('sign up')
          done()
        })
    });

    it('should add a new user', function(done) {
      request(app)
        .post('/users')
        .send({id:1, name: bob})
        .end(function(err,res) {
            request(app).get('users')
          expect(res.text).to.include('bob')
          done()
        })
    });

  });


// request(app)
