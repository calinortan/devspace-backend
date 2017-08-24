import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1OGQ2YmQxYmMzNWNiODFlNTg0MjIyMTAiLCJ'+
'pYXQiOjE0OTA0Njg1NDIxOTF9.B2uuxUHAe3uiG4wB93emx3fuRfRvNlmAuIQmnGM7p1E';
describe('Hello World Route', () => {

  it('should be json', () => {
    chai.request(app).get('/').set('Authorization', token)
    .then(res => {
      expect(res.type).to.eql('application/json');
    });
  });

  it('should have a message prop', () => {
    chai.request(app).get('/')
    .then(res => {
      expect(res.body.message).to.eql('Hello World!');
    });
  });

  it('should have Hello World Message', () => {
    chai.request(app).get('/')
    .then(res => {
      expect(res.body.message).to.eql('Hello World!');
    });
  });
});