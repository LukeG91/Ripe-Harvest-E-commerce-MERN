/* Importing the libraries and modules needed in order to create tests */
let expect = require("chai").expect;
const myApi = require("../myServer");
let request = require("request");

describe(
  "I am going to test my registration API end point to ensure that it responds with the correct status code which is 200."
),
  () => {
    it(
      "This will indicate successful registration and that the user has entered valid data."
    ),
      () => {
        let newUser = {
          name: "John",
          email: "john@test.com",
          password: "12345678",
        };
        request(myApi)
          .post("/user/register")
          .send(newUser)
          .then((response) => {
            expect(response.statusCode).to.equal(200);
          })
          .catch((erroor) => done(error));
      };
  };
