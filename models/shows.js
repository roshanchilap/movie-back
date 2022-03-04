const mongoose = require("mongoose");
const { Schema } = mongoose;
const showSchema = new Schema({
  sid: { type: String, index: { unique: true }, required: true },
  time: { type: String, required: true },
  availableSeats: { type: Number, required: true },
});

const Shows = mongoose.model("Shows", showSchema);

module.exports = Shows;
