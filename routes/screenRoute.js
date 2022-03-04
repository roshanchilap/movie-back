const express = require("express");
const Screen = require("../models/screen");
const Theatre = require("../models/theatre");
const router = express.Router();

//Adding movies to database
router.post("/addScreen", async (req, res) => {
  const data = new Screen(req.body);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all the screens
router.get("/getScreens", async (req, res) => {
  try {
    const screen = await Screen.find().populate("showTime");
    res.send(screen);
  } catch (error) {
    res.send(error);
  }
});

// To delete screen using ID from database
router.delete("/deleteScreen/:id", async (req, res) => {
  try {
    const screen = await Screen.findByIdAndDelete(req.params.id);
    res.send(screen);
  } catch (error) {
    res.send(error);
  }
});

// Update screen details in database
router.put("/updateScreen/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const screen = await Screen.findById(req.params.id);
    updates.forEach((update) => (screen[update] = req.body[update]));
    await screen.save();
    return !screen ? res.sendStatus(404) : res.send(screen);
  } catch (error) {
    res.send(error);
  }
});

// add showtime to particular screen using screen id
router.put("/addShowtime/:scid", async (req, res) => {
  try {
    const movies = await Screen.updateOne({
      scid: req.params.scid,
      $push: { showTime: req.body.showTime },
    });
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
