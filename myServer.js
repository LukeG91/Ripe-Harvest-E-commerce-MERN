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
app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT} \nBrowse to http://localhost:8080 to see the server `
  );
});

/* Resource used: 
   ============== 
   YouTube video: 
   Video title: MERN Stack | Build a Ecommerce Website - Full
   Date published: October 11, 2020
   Published by: Dev A.T Viet Nam
   Link to video: https://www.youtube.com/watch?v=uXl77UFkrkQ
   ===========================================================
*/
