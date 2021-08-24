/* Importing the mongoose library and I am setting it to a variable so that I can use
   it in this file in order to make a connection to my database. */
const mongoose = require("mongoose");

/* Creating a user schema so that I can specify the type of information that will be stored
   in the user collection. */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  /* This allows me to see the user creation date as well as the date when a user was updated. */
  {
    timestamps: true,
  }
);

/* Exporting the model so that I can use this schema in my application. */
module.exports = mongoose.model("Users", userSchema);
