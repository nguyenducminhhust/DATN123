const mongoose = require("mongoose");

const booklistSchema = new mongoose.Schema(
  {
   
    booklist: {
      type: Array,
      default: [],
     // required: true,
    },
    
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Booklist", booklistSchema);
