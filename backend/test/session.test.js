//Unit Test file; runs on dev mode Mocha with chai framework

var express = require("../config/express.js");
var app = express.init();
var chai = require("chai");
var chaiHttp = require("chai-http");
var models = require("../models");
var expect = chai.expect;

// Unit Test for a POST to BMS
chai.use(chaiHttp);

/**
 * Test that we can create a new session and get its ID back
 */
describe("POST /api/session", function () {
  let sessionID = null;
  describe("Should respond with 200 status and the new session ID", function () {
    it("Responds with status 200", function () {
      return chai
        .request(app)
        .post("/api/session")
        .send({
          name: "Test Session",
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.id;
          expect(res.body.name).to.be.equals("Test Session");
          sessionID = res.body.id;
        });
    });
  });
  after("Removing Session.", function () {
    return models.Session.destroy({ where: { id: sessionID } });
  });
});
