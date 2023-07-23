//* import mongoose to create model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* create blog schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
