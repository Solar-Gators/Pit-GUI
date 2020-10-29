//Unit Test file; runs on dev mode Mocha with chai framework

// define the app ref
var express = require("../config/express.tsx");
var app = express.init();
var request = require("supertest");
var should = require("should");
var chai = require("chai");
var chaiHttp = require("chai-http");

var expect = chai.expect;

// Unit Test for a POST to BMS
chai.use(chaiHttp);

describe("POST /api/bms", function () {
  describe("should respond with 200 status on post", function () {
    it("responds with status 200", function (done) {
      chai
        .request(app)

        .post("/api/bms")
        .send({
          test_post: {
            LowCellVoltage: 18,
            highCellVoltage: 18,
            avgCellVoltage: 18,
            packSumVoltage: 18,
          },
        })

        //expand on the "expect"(s) for the 4 parameters; make sure they are each numbers
        .end(function (err, res) {
          expect(res).to.have.status(200);
          //res.body.should.have.property('test_post');

          done();
        });
    });
  });
});
