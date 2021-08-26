/* Importing the modules and libraries that I need for my server */
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");

/* Setting my app to use the express module as well as the modules that the app needs
   to use. */
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

/* Declaring the different routes that are available on my server */
app.use("/user", require("./routes/userRoute"));
app.use("/api", require("./routes/categoryRoute"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRoute"));
app.use("/api", require("./routes/paymentRoute"));

/* Creating a variable that stores the connection string needed in order to connect to
   my MongoDB database. */
const MONGO_URI = process.env.MONGO_URI;

/* Using the mongoose library in order to make a connection to my MongoDB database. */
mongoose.connect(
  MONGO_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  /* If an error is encountered then the error will be shown, otherwise if the connection
     to the database is succesful, a message will be shown indicating that a succesful connection 
     to the database has been established. */
  (err) => {
    if (err) throw err;
    console.log(
      "A successful connection to the database has been established!"
    );
  }
);

/* The code below is responsible for calling the React build assets. */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

/* I am creating a variable for the PORT that my server will be using and I am setting it to use
   the PORT set in the environment variable or to run over PORT 8080.  This is also for when I deploy
   my website to Heroku in case another site is using PORT 8080, then my app will run on another
   available port. */
const PORT = process.env.PORT || 8080;

module.exports = app.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}`)
);

/* Notes and take away points from this task:
   ==========================================
     
   1. This task was very exciting and also a very big challenge,
      I was motivated and very determined to deliver the highest 
     quality of work and to push through bugs that had me stuck 
     for hours because this website is for a real customer.
   2. I gained so much knowldge by doing this build, I now know how 
      to make use of the Cloudinary media storage cloud service and 
      how to use PayPal as a payment gateway in my applications.
   3. My understanding of how everything ties together in a full stack MERN 
      application really came together in this task, it took me very long to build 
      and there are still a few more tweaks as well as a few more features that I will 
      be adding overtime, overall this project really made me feel like I have a deep 
      and good unuderstanding of code and has given me great confidence to go forward 
      into my Web Development career.
    4. This task was fairly daunting in the beginnning, but now that I have built the application
       and I understand how the front end and back end interact with each other and how the database ties in, 
       my confidencein my developing ability has really gone to the next level and I am excited to build
       on this and to land a Junior developer role soon after graduating so I can learn and grow more as
       well as gain more confidence.
    5.  All in all I thoroughly enjoyed this build and it gave me such a good grounding and base to build on
        as I would like to specialize in full stack e-commerce MERN development as I have a real passion for e-commerce/online shopping.
*/

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
