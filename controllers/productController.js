/* Importing the model that I need */
const Products = require("../models/productModel");

/* Creating a class to handle the filtering, sorting as well as loading more products. */
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /* Creating a function to filter products. */
  filtering() {
    /* creating a variable and I am spreading the 'this.queryString' array and I am storing it
       in an object.  */
    const queryObj = { ...this.queryString };

    /* Creating a variable to store the fields that will be excluded. */
    const excludedFields = ["page", "sort", "limit"];

    /* Using a for each loop to remove products that are not part of the search. */
    excludedFields.forEach((el) => delete queryObj[el]);

    /* Creating a variable and I am storing the 'queryObj' in this variable. */
    let queryStr = JSON.stringify(queryObj);

    /* Replacing the query string with the results that match the filter search. */
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    /* Finding the products that match the 'queryStr' variable. */
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  /* Creating a function to sort products. */
  sorting() {
    /* Using an if statement to check if 'this.queryString.sort' is true and if it is
       then I am creating a variable and am storing the information. */
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);

      /* If 'this.queryString.sort' is not true then I am setting 'this.query' and I
         am excluding 'createdAt' date from the sort() method. */
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  /* creating a function to load more products.  Only 9 products can display at a time,
     there will be a 'load more' button that the user can click to display additional
     products if there are more stored in the database. */
  paginating() {
    /* Creating variables for the page, limit and skip. */
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

/* Creating a products controller. */
const productController = {
  /* Get products */
  getProducts: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Creating a variable and I am searching through the products collection and I am
         linking the filtering(), sorting() and paginating() methods to the variable. */
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      /* storing the result from the query in a variable. */
      const products = await features.query;

      /* Returning the status, result as well as the products. */
      res.json({
        status: "success",
        result: products.length,
        products: products,
      });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Create products */
  createProduct: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Deconstructing the req.body and I am extracting the information that I need. */
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      /* Using an if statement to check if there is nothing in the images variable and if there is no
         image present, then an appropriate message will be returned. */
      if (!images)
        return res.status(400).json({ msg: "No image was uploaded" });

      /* searching through the Products collection and I am storing the result in a variable. */
      const product = await Products.findOne({ product_id });

      /* Using an if statement to see if the product already exists, if it does the relevant message will
         be returned. */
      if (product)
        return res.status(400).json({ msg: "This product already exists." });

      /* Creating a new product with the information that the Admin user entered. */
      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      /* Saving the new product to the database. */
      await newProduct.save();

      /* Returning a message that indicates that the product has been created successfully. */
      res.json({ msg: "The product has been created successfully." });

      /* Returning the 'newProduct' variable. */
      res.json(newProduct);

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Delete products */
  deleteProduct: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Searching through the Products collection using the product ID and I am removing that specific product. */
      await Products.findByIdAndDelete(req.params.id);

      /* Returning a message that indicates that the product has been deleted successfully. */
      res.json({ msg: "The product has been successfully deleted." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  /* Update products */
  updateProduct: async (req, res) => {
    /* Using a try catch block to try code and to catch errors if there are any. */
    try {
      /* Deconstructing the req.body and I am extracting the information that I need. */
      const { title, price, description, content, images, category } = req.body;

      /* Using an if statement to check if there is no image present and if there isn't then an appropriate
         message will be returned indicating that no image was uploaded. */
      if (!images)
        return res.status(400).json({ msg: "No image was uploaded" });

      /* Using the findOneAndUpdate() function to update the product. */
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      /* Returning a message which indicates that the product has been updated successfully. */
      res.json({ msg: "The product has been updated successfully." });

      /* Catching potential errors and I am returning a 500 status code along with the relevant error message. */
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

/* Exporting the productController so that I can use it in my application. */
module.exports = productController;

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
