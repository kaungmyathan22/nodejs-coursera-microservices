const mongoose = require("mongoose");
const { MONGO_URI } = process.env;
exports.connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/moviedb", {})
    .then(() => {
      console.log("Successfully connected to movie database !!!");
    })
    .catch((err) => {
      console.log("Database connection Failed .... Exiting Now");
      console.log(err);
      process.exit(1);
    });
};
