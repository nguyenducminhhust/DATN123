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
    },
    namestaff: {
      type: String,
      trim: true,
    },
   
    
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("staffSchedule", staffScheduleSchema);
