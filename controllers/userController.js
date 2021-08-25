/* Importing the modules and files that I need to use in this controller file. */
const Users = require("../models/userModel");
const Payments = require("../models/paymentModel");
/* Using bcrypt to hash passwords. */
const bcrypt = require("bcrypt");
/* using JWT for user authorization. */
const jwt = require("jsonwebtoken");

/* Creating a controller for the processes that users would perform. */
const userController = {
  /* Registering a new user. */
  register: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /*Deconstructing the request body and I am extracting the name, email and password from the request body
        and I am storing them as variables so I can use them in my application. */
      const { name, email, password } = req.body;

      /* Looking through the users collection to check if the email address that the user entered when
         trying to register already exists in the database. */
      const user = await Users.findOne({ email });
      /* Using an if statement to check if the user already exists in the database and if the user does exist
         then the appropriate status code as well as a relevant message will be returned. */
      if (user)
        return res.status(400).json({
          msg: "The email address you are trying to register already exists.",
        });

      /* Using an if statement to check that the password that the user entered is atleast 8 characters
         in length, if it is not then a 400 status code will be returned as well as the relevant message
         informing the user that the password is too short. */
      if (password.length < 8)
        return res.status(400).json({
          msg: "Your password needs to be atleast 8 characters long.",
        });

      /* Hashing the password using the bcrypt module and I am setting the result to the 'passwordHash'
         variable. */
      const passwordHash = await bcrypt.hash(password, 10);

      /* Creating a new user entry in the 'Users' collection within the database by using the data that the
         user entered into the registration form. */
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      /* Saving the 'newUser' to the database. */
      await newUser.save();

      /* I am creating an access token as well as a refresh token that I will use for user authorization
         in my application. */
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      /* I am setting a cookie for the refresh token and I am setting it's age to 5 days. */
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      });

      /* I am returning the accesstoken variable */
      res.json({ accesstoken });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* User login */
  login: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /*Deconstructing the request body and I am extracting the email and password from the request body
        and I am storing them as variables so I can use them in my application. */
      const { email, password } = req.body;

      /* Checking the Users collection to see if there is a user with the email address that the user entered
         and I am setting the resultto a variable. */
      const user = await Users.findOne({ email });

      /* If the email address is not found within the Users collection in the database, then the user does not
         exist and the relevant status code and message will be returned.  */
      if (!user)
        return res.status(400).json({ msg: "The user does not exist." });

      /* I am using the bcrypt compare method to compare the hashed password that is stored in the
         database with the password that the user entered and I am storing the result in a variable. */
      const isMatch = await bcrypt.compare(password, user.password);

      /* Using an if statement to check if the passwords do not match, if they don't then a 400 status code 
         along with a relevant message will be returned. */
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "The password you entered is incorrect." });

      /* I am checking to see if the login is successful, if it is then an access token and a refresh token will be created
         for the user. */
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      /* I am setting a cookie for the refresh token and I am setting it's age to 5 days. */
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      });

      /* I am returning the accesstoken variable */
      res.json({ accesstoken });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* User logout */
  logout: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Clearing the cookie information */
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });

      /* Returning a message indicating that the user has been logged out successfully. */
      return res.json({ msg: "The user has logged out successfully." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Refresh token */
  refreshToken: (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Storing the refresh token in a variable. */
      const rf_token = req.cookies.refreshtoken;

      /* If there is no refresh token present then a 400 status code will be returned as well as
         a relevant message advising the user to login or register before proceeding. */
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or register first." });

      /* Using the JWT verify method to verify the 'rf_token' against the 'REFRESH_TOKEN_SECRET' that is
         stored in my .env file. */
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        /* If an error is encountered then a 400 status code and a relevant message will be returned. */
        if (err)
          return res
            .status(400)
            .json({ msg: "Please login or register first." });

        /* Creating an access token and I am storing it in a variable. */
        const accesstoken = createAccessToken({ id: user.id });

        /* returning the accesstoken. */
        res.json({ accesstoken });
      });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Get user */
  getUser: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Looking through the Users collection to check if the user exists and I am storing the result
         in a variable, I am also excluding the user's password from the search result. */
      const user = await Users.findById(req.user.id).select("-password");

      /* using an if statement to check if the user does not exist, if the user does not exist then the 
         appropriate message will be displayed. */
      if (!user)
        return res.status(400).json({ msg: "The user does not exist" });

      /* Returning the user variable if the user exists. */
      res.json(user);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Get all users */
  getAllUsers: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching the Users collection and I am returning all users and I am storing the information
         in a variable. */
      const allUsers = await Users.find();

      /* Returning the allUsers variable. */
      res.json(allUsers);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Delete a user */
  deleteAUser: (req, res) => {
    /* This function is not yet completed, I'm ou of time, I will complete this ata later stage. */
    const id = req.params.id;
    const userToDelete = { _id: id };
    Users.deleteOne(userToDelete, (err, obj) => {
      if (err) throw err;
      res.json({ msg: "User deleted successfully." });
    });
  },

  /* Add products to cart */
  addCart: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching the Users collection with the user id and I am storing the result in a variable. */
      const user = await Users.findById(req.user.id);

      /* Using a if statement to check if the user does not exist and if the user doesn't exist then
         the relevant status code as well as the relevant message will be returned.  */
      if (!user)
        return res.status(400).json({ msg: "The user does not exist." });

      /* Searching through the Users collection and I am updating the user entry. */
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      /* If the product is added to the cart successfully then an appropriate message will be returned. */
      return res.json({ msg: "The product has been added to your cart" });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Order history */
  history: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the payments collection using the user id and I am storing 
         the result in a variable */
      const history = await Payments.find({ user_id: req.user.id });

      /* Returning the history variable. */
      res.json(history);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

/* Creating a function that will create an access token for a user. */
const createAccessToken = (user) => {
  /* Signing the JWT using the user and the 'ACCESS_TOKEN_SECRET' that is stored in the .env file. */
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

/* Creating a function that will create a refresh token for a user. */
const createRefreshToken = (user) => {
  /* Signing the JWT using the user and the 'REFRESH_TOKEN_SECRET' that is stored in the .env file. */
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5d" });
};

/* Exporting the userController so that I can use it in my program. */
module.exports = userController;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
