//Unit Test file; runs on dev mode Mocha with chai framework

// define the app ref
var express = require("../config/express.js");
var app = express.init();
var request = require("supertest");
var should = require("should");
var chai = require("chai");
var chaiHttp = require("chai-http");
var models = require("../models");
var expect = chai.expect;

// Unit Test for a POST to BMS
chai.use(chaiHttp);

/**
 * Test that we can create a new car and get it back
 */
describe("POST /api/car", function () {
  let carId = null;
  describe("should respond with 200 status on get", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .post("/api/car")
        .send({
          desc: "test desc post",
          name: "test post",
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          carId = res.body.id;
          expect(res.body.name).to.be.equals("test post");
          expect(res.body.desc).to.be.equals("test desc post");
        });
    });
  });
  after("removing Car.", function () {
    return models.Car.destroy({ where: { id: carId } });
  });
});
/**
 * Test that we can get all the cars from the database
 */
describe("GET /api/car", function () {
  let carId = null;
  before("Setting up car.", function () {
    return models.Car.create({
      name: "test get",
      desc: "test desc get",
    }).then((car) => {
      carId = car.id;
    });
  });
  describe("should return a test car", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .get("/api/car")
        .then((res) => {
          let found = false;
          expect(res).to.have.status(200);
          for (let car of res.body) {
            if (car.id === carId) {
              found = true;
              expect(car.name).to.be.equals("test get");
              expect(car.desc).to.be.equals("test desc get");
            }
          }
          expect(found, "Car was not returned").to.be.true;
        });
    });
  });
  after("removing Car.", function () {
    return models.Car.destroy({ where: { id: carId } });
  });
});

/**
 * Test that we can get a single car from the database
 */
describe("GET /api/car/id", function () {
  let carId = null;
  before("Setting up car.", function () {
    return models.Car.create({
      name: "test single get",
      desc: "test single desc get",
    }).then((car) => {
      carId = car.id;
    });
  });
  describe("should return a test car", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .get(`/api/car/${carId}`)
        .then((res) => {
          let found = false;
          expect(res).to.have.status(200);
          if (res.body.id === carId) {
            found = true;
            expect(res.body.name).to.be.equals("test single get");
            expect(res.body.desc).to.be.equals("test single desc get");
          }
          expect(found, "Car was not returned").to.be.true;
        });
    });
  });
  after("removing Car.", function () {
    return models.Car.destroy({ where: { id: carId } });
  });
});
/**
 * Test that we can delete a car from the database
 */
describe("DELETE /api/car/id", function () {
  let carId = null;
  before("Setting up car.", function () {
    return models.Car.create({
      name: "test single delete",
      desc: "test single desc delete",
    }).then((car) => {
      carId = car.id;
    });
  });
  describe("Should return a true success value.", function () {
    it("responds with status 200", function () {
      return chai
        .request(app)
        .delete(`/api/car/${carId}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.be.true;
        });
    });
  });
});
