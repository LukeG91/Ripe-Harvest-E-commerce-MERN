/* Creating variables and I'm assigning the modules/files that I need to use in this file to these variables */
const router = require("express").Router();
/* The cloudinary service is a cloud based service that provides the ability to store media such as images
   and videos in the cloud.  It is then possible to store the URL's required to access the relevant media in
   the database that the website connects to. */
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/* Importing the File System module from Node */
const fs = require("fs");

/* The product images that are uploaded by the Admin of the website will be stored in the cloud using a service
   called Cloudinary. I have stored the information that I need in order to be able to make a succesful connection
   to my Cloudinary service in my '.env' file so the authentication information as well as the API key is secure and
   is not exposed. */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* The code below is the route that will be used if an Admin user wants to upload a product Image.  This
   action can only be performed by an admin user. */
router.post("/upload", auth, authAdmin, (req, res) => {
  /* Using a try catch code block to try code and if it is unsuccesful due to errors, the catch block
     will catch the error. */
  try {
    console.log(req.files);
    /* Using an if statement to check if a file has been uploaded, if no file has been uploaded, then
       an appropriate message will be show. */
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).send({ msg: "No files were uploaded." });

    /* Creating a variable to store the file that the Admin user uploads. */
    const file = req.files.file;
    /* I am using an if statement to check if the size of the file is greater than 10 Megabytes and if it is
       an appropriate message will be returned informing the user that the file is too large. */
    if (file.size > 10240 * 10240) {
      removeTemp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: "File is to large, max size is 10MB." });
    }

    /* Using an if statement to ensure that the file type that user is trying to upload is either 'jpeg' 
       or 'png'.  If the file is a different type of file, then an appropriate message will be shown to the
       user informing them that the file format/type is incorrect. */
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      /* Calling the 'removeTemp' to clear/remove the temporary file that gets created. */
      removeTemp(file.tempFilePath);
      return res.status(400).json({ msg: "Incorrect file format." });
    }

    /* The code below is responsible for connecting to my Cloudinary account and uploading the image to
       the cloud into a specific folder. */
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      /* Using an asynchronous function to check if there are any errors and if there are, those errors will
         be shown.  if there are no errors, then the temporary file that is created will be unlinked/removed 
         and a response will be sent in JSON format which is an object that contains the 'public_id' as well
         as the 'secure_url' that is used to access the image. */
      async (err, result) => {
        if (err) throw err;
        /* Calling the 'removeTemp' function to remove the temporary file that get's created when a file is
           uploaded. */
        removeTemp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );

    /* catching potential errors and I am returning a '500' status code which indicates a server error,
       and I am also returning the error that is encountered. */
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

/* The code below is a route that will be used if the Admin user wants to remove the image that they have
   added in order to be able to upload a different image instead. This is a protected route that only
   Admin users can access. */
router.post("/destroy", auth, authAdmin, (req, res) => {
  /* Using a try catch code block to try code and if it is unsuccesful due to errors, the catch block
     will catch the error. */
  try {
    /* Deconstructing the information within the body of the request and I am extracting the 'public_id'
       and I am storing it in a variable. */
    const { public_id } = req.body;
    /* Using an if statement to check if there is a 'public_id' present, if there isn't then an appropriate
       message will be returned to indicate that no image has yet been selected */
    if (!public_id)
      return res
        .status(400)
        .json({ msg: "Please select an image before proceeding." });

    /* If there is a public_id present then a connection will be made to the cloudinary service
       and the image will be removed.   */
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      /* Returning an appropriate message in JSON format to advise the user that the image has been deleted
         successfully. */
      res.json({ msg: "The image has been successfully deleted." });
    });
    /* Catching potential errors and I am returning a 500 status code which indicates a server error and I am returning
       the relevant error message. */
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

/* Creating a function that removes/unlinks the temp file that gets created after an image gets uploaded
   by an Admin user. */
const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

/* Exporting the router module so that I can use it in my application */
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
