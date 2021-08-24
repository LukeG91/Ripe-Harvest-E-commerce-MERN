/* Setting variables for the libraries and files that I will need to use in in order
   to setup all of the required routes. */
const router = require("express").Router();
const userController = require("../controllers/userController");
/* The 'auth' file contains the code needed to verify the user when logging in or
   performing an action on the website that requires the user to be logged in. */
const auth = require("../middleware/auth");

/* The routes below are all linked to processes/tasks that would be performed by a user. */
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/refresh_token", userController.refreshToken);
router.get("/infor", auth, userController.getUser);
router.patch("/addcart", auth, userController.addCart);
router.get("/history", auth, userController.history);
router.get("/allUsers", userController.getAllUsers);
router.delete("/deleteUser", auth, userController.deleteAUser);

/* I am exporting the router module so that it can be used in my application */
module.exports = router;
