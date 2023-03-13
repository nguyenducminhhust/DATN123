const mongoose = require("mongoose");

const exportSchema = new mongoose.Schema(
  {
    exportid: {
      type: String,
      trim: true,
      required: true,
    },
    productid: {
      type: String,
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

module.exports = mongoose.model("Export", exportSchema);
