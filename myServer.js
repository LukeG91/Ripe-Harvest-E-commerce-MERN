const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Connecting to my database
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
  MONGO_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(
      "A successful connection to the database has been established!"
    );
  }
);

app.get("/", (req, res) => {
  res.json({ msg: "This is working!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `The server is listening on port ${PORT} \nBrowse to http://localhost:8080 to see the server `
  );
});
