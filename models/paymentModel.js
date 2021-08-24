/* Importing the mongoose library and I am setting it to a variable so that I can use
   it in this file in order to make a connection to my database. */
const mongoose = require("mongoose");

/* Creating a payment schema so that I can specify the type of information that will be stored
   in the payment collection. */
const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentID: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  /* This allows me to see the payment creation date as well as the date when a payment was updated. */
  {
    timestamps: true,
  }
);

/* Exporting the model so that I can use this schema in my application. */
module.exports = mongoose.model("Payments", paymentSchema);
