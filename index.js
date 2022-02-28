const express = require("express");

const env = require("./config/environment");
const ejs = require("ejs");

const db = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport_jwt_strategy");
const logger = require("morgan");
const app = express();

const port = 8000;

app.use(express.urlencoded({extended:false}));
app.use(logger(env.morgan.mode, env.morgan.options));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while running server on port ", port);
  }

  console.log("Server is running on port ", port);
});

module.exports = app;
