const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
  {
    productid: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    productname: {
      type: String,
      trim: true,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default:0,
    },
    unitprice: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Cost", costSchema);
