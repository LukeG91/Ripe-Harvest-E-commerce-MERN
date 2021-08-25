/* Importing the models that I need */
const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

/* Creating a payment controller. */
const paymentController = {
  /* Get payments */
  getPayments: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the payments collection and I am returning all payments and am storing them
         in a variable. */
      const payments = await Payments.find();

      /* Returning the 'payments' variable. */
      res.json(payments);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Make a payment */
  createPayment: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the users collection and I am selecting the name and email and I am storing the
         result to a variable. */
      const user = await Users.findById(req.user.id).select("name email");

      /* Using an if statement to check if the user doesn't exist and I am returning a 400 status
         code as well as the relevant message. */
      if (!user)
        return res.status(400).json({ msg: "The user doesn't exist." });

      /* Deconstructing the req.body and the user variable and I am extracting the information that
         I need. */
      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      /* Creating a newPayment variable using the Payments model. */
      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });

      /* Filtering the cart variable and I am returning the result of the sold() function. */
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      /* Saving the newPayment to the database. */
      await newPayment.save();

      /* Returning a message indicating that the payment was successful. */
      res.json({ msg: "The payment was successful." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

/* Creating a function to search through the products collection and update the relevant product
   to reflect the amount of times that specific product has been sold. */
const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

/* Exporting the paymentController so that I can use it in my application. */
module.exports = paymentController;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
