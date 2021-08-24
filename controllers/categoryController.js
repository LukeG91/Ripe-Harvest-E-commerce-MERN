/* Importing the models that I need */
const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

/* Creating a category controller. */
const categoryController = {
  /* Get categories */
  getCategories: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the category collection and I am returning all categories and I am storing the
         results in a variable. */
      const categories = await Category.find();

      /* Returning the categories variable. */
      res.json(categories);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Create a category */
  createCategory: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      //If user's role = 1 --> Admin
      //Only admin users can create, delete and update categories
      /* Deconstructing the req.body and I am extracting the information that I need. */
      const { name } = req.body;

      /* Searching through the category collection and I am storing the result in a variable. */
      const category = await Category.findOne({ name });

      /* If the category has a value then a 400 status code will be returned along with an appropriate
         message indicating that the user already exists. */
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      /* Creating a new category using the name that the user entered. */
      const newCategory = new Category({ name });

      /* Saving the new category to the database. */
      await newCategory.save();

      /* Returning a message that indicates that the category has been created successfully. */
      res.json({ msg: "The category has been created successfully" });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Delete a category */
  deleteCategory: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the products collection and I am storing the result in a variable. */
      const products = await Products.findOne({ category: req.params.id });

      /* If there are products linked to the category that the user would like to delete, then the user
         would first need to delete the products that are linked to that category before deleting the category. */
      if (products)
        return res.status(400).json({
          msg: "Please delete all products with a relationship before trying to remove this category.",
        });

      /* Using the findByIdAndDelete() method to remove the relevant category from the database. */
      await Category.findByIdAndDelete(req.params.id);

      /* Returning a message indicating that the category has been successfully deleted. */
      res.json({ msg: "The category has been successfully deleted." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Update a category */
  updateCategory: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Deconstructing the req.body and I am extracting the information that I need. */
      const { name } = req.body;

      /* Using the findOneAndUpdate() method to perform the relevant update in the category collection. */
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      /* Returning a message indicating that the category has been updated successfully. */
      res.json({ msg: "The category has been updated successfully." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

/* Exporting the categoryController so that I can use it in my application. */
module.exports = categoryController;
