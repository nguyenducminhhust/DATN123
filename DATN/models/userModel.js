const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    service: {
      type: String,
      default: "",
    },
    kindofstaff: {
      type: String,
      default: "",
    },
    cart: {
      type: Array,
      default: [],
    },
    servicebought: {
      type: Array,
      default: [],
    },
    phonenumber: {
      type: Number,
      trim: true,
    },
    salary: {
      type: Number,
      
    },
    note:{
      type: String,

    },
    debt:{
      type: Number,
      default: 0,

    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
