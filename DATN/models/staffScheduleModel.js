const mongoose = require("mongoose");

const staffScheduleSchema = new mongoose.Schema(
  { 
    email: {
      type: String,
      trim: true,
    },
    daywork: {
      type: String,
      trim: true,
    },
    arraytimework: {
      type: Array,
      default: [],
      //required: true,
      // default: "",
    },
    namestaff: {
      type: String,
      trim: true,
      //required: true,
    },
   
    
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("staffSchedule", staffScheduleSchema);
