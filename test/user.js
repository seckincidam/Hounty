var expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/hounty', {useMongoClient: true});
import {User} from '../api/models/user-model'
let api = 'http://localhost:3000/api'

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({email: 'test@test.com'}, (err) => {
      done()
    })
  });
  describe('/Register user', () => {
    it('should register user and send token', (done) => {
      let user = {
        email: "test@test.com",
        username: "testusername",
        password: "testpassword"
      }
      chai.request(api).post('/users/register').send(user).end((err, res) => {
        expect(res).to.have.property('text')
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should send short password error', (done) => {
      let user = {
        email: "test@test.com",
        username: "testusername",
        password: "1234"
      }
      chai.request(api).post('/users/register').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send username error', (done) => {
      let user = {
        email: "test@test.com",
        password: "testpassword"
      }
      chai.request(api).post('/users/register').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send email error', (done) => {
      let user = {
        email: "testtest.com",
        password: "testpassword"
      }
      chai.request(api).post('/users/register').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('/Login user', () => {
    it('should send invalid email or password error', (done) => {
      let user = {
        email: "invalid@email.com",
        password: "password"
      }
      chai.request(api).post('/users/login').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send invalid email or password error', (done) => {
      let user = {
        email: "valid@email.com",
        password: "invalidpassword"
      }
      chai.request(api).post('/users/login').send(user).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send token', (done) => {
      let user = {
        email: "valid@email.com",
        password: "password"
      }
      chai.request(api).post('/users/login').send(user).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('/Auth user', () => {
    it('should send authorized', (done) => {
      let token = {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4"}
      chai.request(api).post('/users/auth').send(token).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should send unauthorized error', (done) => {
      let token = {token: "invalid jwt token"}
      chai.request(api).post('/users/auth').send(token).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
});
