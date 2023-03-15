const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  { 
    contactid: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Contact", contactSchema);
