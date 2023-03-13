const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Array,
      default:[],
      required: true,
    },
    durationtime: {
      type: Number,
      // required: true,
      default:0,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
   
    // timebought:{
    //   type: Number,
    //   default:1,
    // },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Services", serviceSchema);
