/* Importing the user model and I am setting it to a variable. */
const Users = require("../models/userModel");

/* Creating a function to check if a user is an Admin user. */
const authAdmin = async (req, res, next) => {
  /* Using a try catch code block to try code and if errors are encountered then the
     catch block will catch the error. */
  try {
    /* I am looking through the Users collection to find a user with the
       id that is in the request that is made and I am storing the information in a variable. */
    const user = await Users.findOne({
      _id: req.user.id,
    });
    /* Using an if statement to check if the users role is set to 0 and if it is then Admin access will be
       denied. */
    if (user.role === 0)
      return res
        .status(400)
        .json({ msg: "You are not an admin user, admin access denied" });

    /* The next() function is responsible for running the middleware that follows the current middleware. */
    next();
    /* If errors are encountered they will be caught and the relevant status code along with the
       relevant error message will be returned. */
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

/* Exporting the auth function so that I can use it in my application. */
module.exports = authAdmin;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
