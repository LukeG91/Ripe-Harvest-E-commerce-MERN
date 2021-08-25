/* Setting variables for the libraries and files that I will need to use in in order
   to setup all of the required routes. */
const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

/* The route below is related to the payment process and will be called according to the URL that is used. */
router
  .route("/payment")
  /* This route handles the retrieval of payments made by customers(payment history). */
  .get(auth, authAdmin, paymentController.getPayments)
  /* This route handles the payment process when a user checks out and pays for the items in their cart. */
  .post(auth, paymentController.createPayment);

/* I am exporting the router module so that it can be used in my application */
module.exports = router;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
