/* Importing the libraries and files that I need. */
let chai = require("chai");
let api = require("../myServer");
let http = require("chai-http");

//Assertion style
chai.should();

/* Setting chai to use the http module so that I can make http requests to my API */
chai.use(http);

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

/* Resource used:
   ==============
   YouTube video:
   Title of video: Testing a REST API in Node JS with Express using Mocha and Chai
   Published by: Pragmatic Reviews
   Date published: Nov 7 2019
   Link to video: https://www.youtube.com/watch?v=I4BZQr-5mBY
   ================================================================================
*/
