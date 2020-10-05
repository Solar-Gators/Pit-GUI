//Unit Test file; runs on dev mode Mocha with chai framework

// define the app ref
var express = require('../config/express')
var app = express.init()
var request = require('supertest');
var should = require('should');
var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

// Unit Test for a POST to BMS
chai.use(chaiHttp);

describe('POST /api/bms', function() {
    describe('should respond with 200 status on post', function() {
        it('responds with status 200', function(done) {
            chai.request(app)

                .post('/api/bms')
                .send({"test_post" :
                        {
                            "LowCellVoltage"  : 18,
                            "highCellVoltage" : 18,
                            "avgCellVoltage"  : 18,
                            "packSumVoltage"  : 18
                        }})

                //expand on the "expect"(s) for the 4 parameters; make sure they are each numbers
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    console.log(res)
                    //res.body.should.have.property('test_post');

                    done();
                });
        });
    });
});

/*
describe('POST /api/bms', function (done) {
    it('should respond with 200 status on post', function(done) {
        request(app)
            //an example req_test for bms
            let test_number = 18

            let test_post ={
                LowCellVoltage  : test_number,
                highCellVoltage  : test_number,
                avgCellVoltage : test_number,
                packSumVoltage  : test_number
            }

            //Post a test_post to the location
            .post('/api/bms')
            .send(test_post)

            //Unit test expectation
            .expect(200)
            .expect('Content-Type', /json/)

            //expand on the "expect"(s) for the 4 parameters; make sure they are each numbers
            .end(function(err, res) {
            if (err) done(err);
                });
            done();
        });
});



*/