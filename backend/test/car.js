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

// Unit Test for a POST to BMS
chai.use(chaiHttp);

describe("POST /api/car", function () {
  let carId = null;
  describe("should respond with 200 status on get", function () {
    it("responds with status 200", function () {
      return (
        chai
          .request(app)

          .post("/api/car")
          .send({
            desc: "test desc post",
            name: "test post",
          })

          //expand on the "expect"(s) for the 4 parameters; make sure they are each numbers
          .then(function (res) {
            expect(res).to.have.status(200);
            if (car.id === carId) {
              expect(car.name).to.be.equals("test post");
              expect(car.desc).to.be.equals("test desc psot");
            }
          })
      );
    });
  });
});

describe("GET /api/car", function () {
  let carId = null;
  before("Setting up car.", function () {
    return models.Car.create({
      name: "test get",
      desc: "test desc get",
    }).then((car) => {
      carId = car.id;
      console.log(car);
    });
  });
  describe("should return a test car", function () {
    it("responds with status 200", function () {
      return (
        chai
          .request(app)

          .get("/api/car")

          //expand on the "expect"(s) for the 4 parameters; make sure they are each numbers
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
          })
      );
    });
  });
  after("removing Car.", function () {
    return models.Car.destroy({ where: { id: carId } });
  });
});
