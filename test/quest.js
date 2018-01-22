var expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/hounty', {useMongoClient: true});
import {Quest} from '../api/models/quest-model'
let api = 'http://localhost:3000/api'

chai.use(chaiHttp);

describe('Quests', () => {
  beforeEach((done) => {
    Quest.remove({text: 'example quest text'}, (err) => {
      done()
    })
  });
  describe('/Add new quest', () => {
    it('should add a new quest', (done) => {
      let quest = {
        text: "example quest text",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4",
        endDate: new Date()
      }
      chai.request(api).post('/quests/new').send(quest).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should send quest text error', (done) => {
      let quest = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4",
        endDate: new Date()
      }
      chai.request(api).post('/quests/new').send(quest).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send invalid token error', (done) => {
      let quest = {
        text: "example quest text",
        token: "invalidtoken",
        endDate: new Date()
      }
      chai.request(api).post('/quests/new').send(quest).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should send invalid end date error', (done) => {
      let quest = {
        text: "example quest text",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4"
      }
      chai.request(api).post('/quests/new').send(quest).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('/Upvote a quest', () => {
    before((done) => {
      Quest.findByIdAndUpdate('5a65e0099b41303dd463da83', { upvotedUsers: [] }, (err) => {
        done()
      })
    });
    it('should upvote the quest', (done) => {
      let questID = '5a65e0099b41303dd463da83'
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4'
      chai.request(api).post('/quests/upvote').send({questID: questID, token: token}).end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
    })
    it('should send already upvoted error', (done) => {
      let questID = '5a65e0099b41303dd463da83'
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4'
      chai.request(api).post('/quests/upvote').send({questID: questID, token: token}).end((err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
    it('should send quest not found error', (done) => {
      let questID = '5a65e00a83'
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIb3VudHkiLCJkYXRhIjoiNWE2NWM1YzMwZDk5ZDc1MDgwOThjOTIwIiwiaWF0IjoxNTE2NjE5NzgxfQ.6GedvqRTf5iTYY4IR2Q0TqoT2QvAtkd0WGNW6CNoeN4'
      chai.request(api).post('/quests/upvote').send({questID: questID, token: token}).end((err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
    it('should send invalid token error', (done) => {
      let questID = '5a65e0099b41303dd463da83'
      let token = 'invalidtoken'
      chai.request(api).post('/quests/upvote').send({questID: questID, token: token}).end((err, res) => {
        expect(res).to.have.status(400)
        done()
      })
    })
  })
});
