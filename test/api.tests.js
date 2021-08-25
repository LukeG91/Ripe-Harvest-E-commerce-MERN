/* Importing the libraries and files that I need. */
let chai = require("chai");
let api = require("../myServer");
let http = require("chai-http");

//Assertion style
chai.should();

/* Setting chai to use the http module so that I can make http requests to my API */
chai.use(http);

/* Testing the product API end point */
describe("I am testing the product API end points", () => {
  /* Testng the GET API route to see if the route being used returns an object */
  describe("Peforming a test on the /api/products end point.", () => {
    it("Testing to ensure an object is returned.", (done) => {
      chai
        .request(api)
        .get("/api/products")
        .end((err, response) => {
          response.body.should.be.a("object");
          done();
        });
    });

    /* Testing the product route using the incorrect server path to check that a 404 tatus code is returned when this happens */
    it("An object should not be returned", (done) => {
      chai
        .request(api)
        .get("/api/productss")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

/* Testing the User API end point */
describe("I am testing the User API end points", () => {
  /* Testing the /user/register endpoint to ensure a 200 status code is returned when a user registers on the website. */
  describe("Peforming a test on the /user/register end point.", () => {
    /* Expecting a 200 status code to be returned. */
    it("Testing to ensure a 200 response code", (done) => {
      let newUser = {
        name: "John",
        email: "john@test.com",
        password: "12345678",
      };
      chai
        .request(api)
        .post("/user/register")
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  /* Testing the /user/register endpoint to ensure a 400 status code is returned when a user enters a password that is too short */
  describe("Peforming a test on the /user/register end point.", () => {
    /* Expecting a 400 status code to be returned. */
    it("Testing to ensure a 400 response code", (done) => {
      let newUser = {
        name: "John smith",
        email: "john@test2.com",
        password: "1234",
      };
      chai
        .request(api)
        .post("/user/register")
        .send(newUser)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });
});

/* Resource used:
   ==============
   YouTube video:
   Title of video: Testing a REST API in Node JS with Express using Mocha and Chai
   Published by: Pragmatic Reviews
   Date published: Nov 7 2019
   Link to video: https://www.youtube.com/watch?v=I4BZQr-5mBY
   ================================================================================
*/
