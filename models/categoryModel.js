/* Importing the mongoose library and I am setting it to a variable so that I can use
   it in this file in order to make a connection to my database. */
const mongoose = require("mongoose");

/* Creating a category schema so that I can specify the type of information that will be stored
   in the category collection. */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  /* This allows me to see the category creation date as well as the date when a category was updated. */
  {
    timestamps: true,
  }
);

/* Exporting the model so that I can use this schema in my application. */
module.exports = mongoose.model("Category", categorySchema);
