/* Importing the 'jsonwebtoken' library and I am setting it to a variable.  I am going
   to be using JWT for user authorization in my application. */
const jwt = require("jsonwebtoken");

/* Creating a function to check if a user has a JSON Web token and to verify
   the token if there is a token present, if there is no JWT present, then an
   appropriate error message will be returned. */
const auth = (req, res, next) => {
  /* Using a try catch code block to try code and if errors are encountered then the
     catch block will catch the error. */
  try {
    /* Creating a variable and I am checking to see if there is a JWT that is
    passed through the headers of the request which has a key of 'Authorization'. */
    const token = req.header("Authorization");

    /* Using an if statement to check if there is no token present and if there isn't
       then a 500 status code along with a JSON message will be returned indicating that
       the authentication is invalid. */
    if (!token) return res.status(500).json({ msg: "Authentication error" });

    /* using the JWT verify method to check that the JWT that is passed through the headers of the request is
       valid, this is done by checking the token against the 'ACCESS_TOKEN_SECRET' that I have set in my
       .env file. */
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      /* If an error is encountered then a 500 status code along with the relevant error message will be returned. */
      if (err)
        return res
          .status(500)
          .json({ msg: "Authentication error due to invalid credentials" });

      /* If no errors are encountered then the user is verified and set */
      req.user = user;

      /* The next() function is responsible for running the middleware that follows the current middleware. */
      next();
    });
    /* If errors are encountered they will be caught and the relevant status code along with the
       relevant error message will be returned. */
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

/* Exporting the auth function so that I can use it in my application. */
module.exports = auth;
