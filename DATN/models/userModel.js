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
      // required: true,
    },
    service: {
      type: String,
      default: "",
      // required: true,
    },
    kindofstaff: {
      type: String,
      default: "",
      // required: true,
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
      //required,
    },
    salary: {
      type: String,
      
    },
    balance:{
      type: Number,
      default: 0,

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
