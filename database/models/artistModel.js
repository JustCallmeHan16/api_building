//* import mongoose to create model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* create artist schema
const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    song: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artist", artistSchema);
