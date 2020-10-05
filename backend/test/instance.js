//Unit Test file; runs on dev mode Mocha with chai framework

// define the app ref
var express = require("../config/express");
var app = express.init();
var request = require("supertest");
var should = require("should");
var chai = require("chai");
var chaiHttp = require("chai-http");
var models = require("../models");
var expect = chai.expect;

var expect = chai.expect;

// Unit Test for a POST to BMS
chai.use(chaiHttp);

/**
 * Test that we can create a new instance and get it back
 */
describe("POST /api/instance", function () {
  let instanceId = "test post";
  describe("should respond with 200 status on get", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .post("/api/instance")
        .send({
          type: "test type post",
          name: "test post",
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.name).to.be.equals("test post");
          expect(res.body.type).to.be.equals("test type post");
        });
    });
  });
  after("Removing instance.", function () {
    return models.Instance.destroy({ where: { name: instanceId } });
  });
});
/**
 * Test that we can get all the Instances from the database
 */
describe("GET /api/instance", function () {
  let instanceId = null;
  before("Setting up Instance.", function () {
    return models.Instance.create({
      name: "test get",
      type: "test type get",
    }).then((instance) => {
      instanceId = instance.name;
    });
  });
  describe("should return a test instance", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .get("/api/instance")
        .then((res) => {
          var found = false;
          expect(res).to.have.status(200);
          for (let instance of res.body) {
            if (instance.name == instanceId) {
              found = true;
              expect(instance.name).to.be.equals("test get");
              expect(instance.type).to.be.equals("test type get");
            }
          }
          expect(found, "instance was not returned").to.be.true;
        });
    });
  });
  after("removing instance.", function () {
    return models.Instance.destroy({ where: { name: instanceId } });
  });
});

/**
 * Test that we can get a single instance from the database
 */
describe("GET /api/instance/id", function () {
  let instanceId = null;
  before("Setting up instance.", function () {
    return models.Instance.create({
      name: "test single get",
      type: "test single type get",
    }).then((instance) => {
      instanceId = instance.name;
    });
  });
  describe("should return a test instance", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .get(`/api/instance/${instanceId}`)
        .then((res) => {
          let found = false;
          expect(res).to.have.status(200);
          if (res.body.name == instanceId) {
            found = true;
            expect(res.body.name).to.be.equals("test single get");
            expect(res.body.type).to.be.equals("test single type get");
          }
          expect(found, "instance was not returned").to.be.true;
        });
    });
  });
  after("removing instance.", function () {
    return models.Instance.destroy({ where: { name: instanceId } });
  });
});
/**
 * Test that we can delete a instance from the database
 */
describe("DELETE /api/instance/id", function () {
  let instanceId = null;
  before("Setting up instance.", function () {
    return models.Instance.create({
      name: "test single delete",
      type: "test single type delete",
    }).then((instance) => {
      instanceId = instance.name;
    });
  });
  describe("Should return a true success value.", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .delete(`/api/instance/${instanceId}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.true;
        });
    });
  });
});
