/* Setting variables for the libraries and files that I will need to use in in order
   to setup all of the required routes. */
const router = require("express").Router();
const productController = require("../controllers/productController");

/* The routes below are related to the products and will be called according to the URL that is used. */
router
  .route("/products")
  /* This route handles the retrieving of the product information from the database. */
  .get(productController.getProducts)
  /* This route handles product creation. */
  .post(productController.createProduct);

router
  .route("/products/:id")
  /* This route handles product deletion. */
  .delete(productController.deleteProduct)
  /* This route handles product updates. */
  .put(productController.updateProduct);

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
