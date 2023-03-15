const mongoose = require("mongoose");

const dataprocesscustomerSchema = new mongoose.Schema(
  {
   
    session: {
      type: Number,
    },
    images: {
      type: Object,
      trim: true,
    },
    dataprocesscustomerid: {
      type: String,
    },
    staff: {
      type: String,
    },
    daymake: {
      type: String,
    },
    service: {
      type: String,
    },
    
   
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("dataprocesscustomer", dataprocesscustomerSchema);
