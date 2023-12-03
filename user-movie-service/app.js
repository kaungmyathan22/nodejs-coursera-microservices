require("dotenv").config();
require("./config/database").connect();
const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const Movie = require("./models/movie");
const User = require("./models/user");
const app = express();
const port = 3000;
app.use(express.json());
let TOKEN_KEY = "gfg_jwt_secret_key";
app.post("/movie", async (req, res) => {
  try {
    const { movieId, movieName, yearReleased } = request.body;
    if (!(movieId && movieName && yearReleased)) {
      return res.status(400).json({ message: "All input are required." });
    }
    const existingMovie = await Movie.findOne({ movieId });
    if (existingMovie) {
      return res.status(409).json({ message: "Movie already existed." });
    }
    const movie = await Movie.create({
      movieId,
      movieName,
      yearReleased,
    });
    return res.status(201).json(movie);
  } catch (error) {
    console.log(error);
  }
});
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  try {
    const { email, username, password, watchList } = request.body;
    if (!(email && username && username && watchList)) {
      return res.status(400).json({ message: "All input are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already existed." });
    }
    const hashedPasswrod = await bcryptjs.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPasswrod,
      watchList,
    });
    const token_payload = {
      time: new Date(),
      userId: user._id,
    };
    const token = jwt.sign(token_payload, TOKEN_KEY);
    return res.status(201).json(token);
  } catch (error) {
    console.log(error);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => res.json("Hello World!"));
module.exports = app;
