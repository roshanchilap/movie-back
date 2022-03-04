const express = require("express");
const Shows = require("../models/shows");
const router = express.Router();

//Adding movies to database
router.post("/addShow", async (req, res) => {
  const data = new Shows(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Getting all the movies in database
// router.get("/getMovies/:time", async (req, res) => {
//   try {
//     const movies = await Movie.where("runtime").equals(req.params.time);
//     res.send(movies);
//   } catch (error) {
//     res.send(error);
//   }
// });

router.get("/getShows", async (req, res) => {
  try {
    const shows = await Shows.find();
    res.send(shows);
  } catch (error) {
    res.send(error);
  }
});

// To delete movie using ID from database
router.delete("/deleteShow/:id", async (req, res) => {
  try {
    const shows = await Shows.findByIdAndDelete(req.params.id);
    res.send(shows);
  } catch (error) {
    res.send(error);
  }
});

// Update movie details in database
router.put("/updateShow/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const shows = await Shows.findById(req.params.id);
    updates.forEach((update) => (shows[update] = req.body[update]));
    await shows.save();
    return !shows ? res.sendStatus(404) : res.send(shows);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
