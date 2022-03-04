const mongoose = require("mongoose");
const { Schema } = mongoose;

const theatreSchema = new Schema({
  tid: { type: String, index: { unique: true }, required: true },
  tname: { type: String, required: true },
  rating: { type: String, required: true },
  capacity: { type: Number, required: true },
  screens: [{ type: Schema.Types.ObjectId, ref: "Screen" }],
});

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
