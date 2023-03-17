const mongoose = require("mongoose");

const bookingSystemSchema = new mongoose.Schema(
  { 
    email: {
      type: String,
      trim: true,
    },
    bookdate: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
      //required: true,
      default: "",
    },
    namestaff: {
      type: String,
      trim: true,
      //required: true,
    },
    namecustomer: {
      type: String,
      trim: true,
      required: true,
    },
    phonenumber: {
      type: Number,
      trim: true,
      //required,
    },
    booktime: {
      type: String,
      trim: true,
    },
   
    booknote: {
      type: String,
      trim: true,
    },
    numbertime:{
      type:Number,
    },
    hidestaffname: {
      type: String,
      trim: true,
    },
    
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("BookingSystem", bookingSystemSchema);
