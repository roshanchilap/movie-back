const mongoose = require("mongoose");
const { Schema } = mongoose;
const screenSchema = new Schema({
  scid: { type: String, index: { unique: true }, required: true },
  showTime: [{ type: Schema.Types.ObjectId, ref: "Shows" }],
});

const Screen = mongoose.model("Screen", screenSchema);

module.exports = Screen;
