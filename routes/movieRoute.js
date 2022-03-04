const express = require("express");
const { default: mongoose } = require("mongoose");
const Movie = require("../models/movie");
const Theatre = require("../models/theatre");
const router = express.Router();

//Adding movies to database
router.post("/addMovie", async (req, res) => {
  const toDo = mongoose.Types.ObjectId;
  const data = new Movie(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// getting all the movies
router.get("/getMovies", async (req, res) => {
  try {
    const movies = await Movie.find().populate({
      path: "theatre",
      populate: { path: "screens", populate: { path: "showTime" } },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// To delete movie using ID from database
router.delete("/deleteMovie/:id", async (req, res) => {
  try {
    const movies = await Movie.findByIdAndDelete(req.params.id);
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// Update movie details in database
router.put("/updateMovie/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    console.log(Object.keys(req.body));
    const movies = await Movie.findById(req.params.id);
    updates.forEach((update) => (movies[update] = req.body[update]));
    await movies.save();
    return !movies ? res.sendStatus(404) : res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

//add theatre in movie
//get screen
router.get("/getMovies/:mid/:tid/:scid", async (req, res) => {
  try {
    const result = await Movie.find({ mid: 1 }).populate({
      path: "theatresId",
      populate: { path: "screens", populate: { path: "showTime" } },
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  try {
    const theatres = await Theatre.find({}).populate({
      path: "screens",
      populate: { path: "showTime" },
    });
    res.send(theatres);
  } catch (error) {
    res.send(error);
  }
});

// getting particular movie using id
router.get("/getMovies/:id", async (req, res) => {
  try {
    const movies = await Movie.find({ _id: req.params.id }).populate({
      path: "theatre",
      populate: { path: "screens", populate: { path: "showTime" } },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
