const mongoose = require("mongoose");
const { Schema } = mongoose;
const movieSchema = new Schema({
  mid: { type: String, index: { unique: true }, required: true },
  mname: { type: String, index: { unique: true }, required: true },
  summary: { type: String, required: true },
  rating: { type: String, required: true },
  posterpath: { type: String, required: true },
  runtime: { type: String, required: true },
  theatre: [{ type: Schema.Types.ObjectId, ref: "Theatre" }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
