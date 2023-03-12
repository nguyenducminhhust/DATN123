const mongoose = require("mongoose");

const dataprocesscustomerSchema = new mongoose.Schema(
  {
   
    session: {
      type: Number,
      //default: 1,
     
    },
    images: {
      type: Object,
      trim: true,
//required: true,
    },
    dataprocesscustomerid: {
      type: String,
      //default: "",
    },
    staff: {
      type: String,
     // required: true,
    },
    daymake: {
      type: String,
      //required: true,
    },
    service: {
      type: String,
      //required: true,
    },
    
   
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("dataprocesscustomer", dataprocesscustomerSchema);
