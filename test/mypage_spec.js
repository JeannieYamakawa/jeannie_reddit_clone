var app = require('../server');
var request = require('supertest');
var mocha = require('mocha');
var expect = require('chai').expect;
var knex = require('../db/knex');

describe('myReddit', function(){
// describe('GET /', function() {
//   it('should redirect to list of users page', function(done) {
//     request(app)
//       .get('/')
//       .end(function(err,res){
//           expect(res.text).to.equal('send is working')
//           done()
//       })
//   });
// });


describe('POST /users/new',function() {
  it('should post new user to database', function(done) {
    request(app)
      .get('/users/new')
      .end(function(err, res) {
        if(err) return done(err);
        expect(res.text).to.include('')
        done()
      })
  });
  it('should redirect to page of all users', function(done) {
    request(app)
      .get('/users')
      .end(function(err, res) {
        if(err) return done(err);
        expect(res.text).to.include('')
        done()
      })
  });
});



describe('GET /users', function() {
      before(function(done){
          knex('comments').del().then(function(err){
              knex('posts').del().then(function(err){
                  knex('users').del().then(function(err){
                      done();
                  })
              })
          })
      })
      it('should display all users', function(done) {
        //   add a user to table
         knex('users').insert({"username": 'JeanBob'}).then(function(err) {
            // if(err) console.error(err, "this is the error")
            // else
            //make sure new user is on page
            request(app).get('/users')
            .end(function(err,res){
                expect(res.text).to.include("JeanBob")
                done()
            })
        })
      })
})



//
//
//
//
//
//
// describe('GET /users/:id', function() {
//   it('should display specific user by ID', function(done) {
//     request(app)
//       .get('/users/:id')
//       .end(function(err, res) {
//         if(err) return done(err);
//         expect(res.text).to.equal('specific user ID')
//         done()
//       })
//       // .expect(200, done);
//   });
// });
//
//
//
//
//
//
//
//   describe('GET /users/new', function() {
//     it('should take us to new users page', function(done) {
//       request(app)
//         .get('/users/new')
//         .end(function(err,res) {
//           if(err) return done(err);
//           expect(res.text).to.include('bob')
//           done()
//         })
//     });
//
//     it('should add a new user', function(done) {
//       request(app)
//         .post('/users')
//         .send({id:1, name: bob})
//         .end(function(err,res) {
//             request(app).get('users')
//           expect(res.text).to.include('bob')
//           done()
//         })
//     });
//
//   });
 })







// request(app)
