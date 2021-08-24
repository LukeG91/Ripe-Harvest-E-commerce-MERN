/* Setting variables for the libraries and files that I will need to use in in order
   to setup all of the required routes. */
const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

/* The routes below are related to the product categories and will be called when the relevant URL's are used. */
router
  .route("/category")
  /* The route below handles the retrieval of the product categories. */
  .get(categoryController.getCategories)
  /* The route below handles the creation of product categories. */
  .post(auth, authAdmin, categoryController.createCategory);

router
  .route("/category/:id")
  /* The route below handles the deletion of a product category and can only be performed by an Admin user. */
  .delete(auth, authAdmin, categoryController.deleteCategory)
  /* The route below handles the updating of a product category. */
  .put(auth, authAdmin, categoryController.updateCategory);

/* I am exporting the router module so that it can be used in my application */
module.exports = router;
