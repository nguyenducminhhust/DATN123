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
      //required,
    },
    // booklist: {
    //   type: Array,
    //   default: [],
    // },
    booknote: {
      type: String,
      trim: true,
     // required: true,
    },
    numbertime:{
      type:Number,
    }
    
    
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("BookingSystem", bookingSystemSchema);
