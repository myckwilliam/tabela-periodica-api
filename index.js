const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

mongoose.connect("").then(() => {
  console.log("Database conection established");

  app.listen(PORT, (err) => {
    console.log("Server listening on port " + PORT);
    err && console.log(err);
  });
});
