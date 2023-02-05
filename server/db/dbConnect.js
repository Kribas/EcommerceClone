const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to Mongo DB");
    })
    .catch((error) => {
      console.log("Unable to connect to mongo DB");
      console.log(error);
    });
};

module.exports = dbConnect;
