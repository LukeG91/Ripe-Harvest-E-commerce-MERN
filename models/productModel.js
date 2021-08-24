/* Importing the mongoose library and I am setting it to a variable so that I can use
   it in this file in order to make a connection to my database. */
const mongoose = require("mongoose");

/* Creating a product schema so that I can specify the type of information that will be stored
   in the products collection. */
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  /* This allows me to see the product creation date as well as the date when a product was updated. */
  {
    timestamps: true,
  }
);

/* Exporting the model so that I can use this schema in my application. */
module.exports = mongoose.model("Products", productSchema);
