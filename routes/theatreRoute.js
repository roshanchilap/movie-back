const express = require("express");
const { default: mongoose } = require("mongoose");
const Theatre = require("../models/theatre");
const Movie = require("../models/movie");
const router = express.Router();
const Screen = require("../models/screen");

//Adding theatre to database
router.post("/addTheatre", async (req, res) => {
  const data = new Theatre(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// //Getting all the movies in database
// router.get("/getMovies/:tid", async (req, res) => {
//   try {
//     const movies = await Movie.where("runtime").equals(req.params.time);
//     res.send(movies);
//   } catch (error) {
//     res.send(error);
//   }
// });

// Getting all the theatres
router.get("/getTheatres", async (req, res) => {
  try {
    const theatres = await Theatre.find().populate({
      path: "screens",
      populate: "showTime",
    });
    res.send(theatres);
  } catch (error) {
    res.send(error);
  }
});

// To delete theatre using ID from database
router.delete("/deleteTheatre/:id", async (req, res) => {
  try {
    const movies = await Theatre.findByIdAndDelete(req.params.id);
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// Update theatre details in database
router.put("/updateTheatre/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    console.log(Object.keys(req.body));
    const theatres = await Theatre.findById(req.params.id);
    updates.forEach((update) => (theatres[update] = req.body[update]));
    await theatres.save();
    return !theatres ? res.sendStatus(404) : res.send(theatres);
  } catch (error) {
    res.send(error);
  }
});

// Pushing screen in to the theatre using theatre id
router.put("/addScreen/:id", async (req, res) => {
  try {
    const movies = await Theatre.updateOne({
      $and: {
        tid: req.params.name,
      },
      $push: { screens: req.body.screens },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// get all the theatres of particular movie using movie id
router.get("/getTheatre/:mid", async (req, res) => {
  try {
    const movies = await Movie.find(
      {
        mid: req.params.mid,
      },
      {
        theatre: 1,
        showTime: 1,
      }
    ).populate({
      path: "theatre",
      populate: { path: "screens", populate: "showTime" },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

// Assign theatre to movie using movie id
router.put("/addTheatre/:mid", async (req, res) => {
  try {
    const movies = await Movie.updateOne({
      mid: req.params.mid,
      $push: { theatre: req.body.theatre },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
