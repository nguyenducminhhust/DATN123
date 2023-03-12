const mongoose = require("mongoose");

const ContainerServiceSchema = new mongoose.Schema(
  {
    serviceid:{
      type: String,
     // required: true,
      trim: true,
     
  },
  servicename:{
    type: String,
   // required: true,
    trim: true,
},
    email:{
    type: String,
   // required: true,
    trim: true,
},
    detailprocess :{
        type: Array,
       default:[],
       
    },
    timebought:{
      type: Number,
      default:1,
    },
    paymentid:{
      type: String,
      trim: true,
    },
    totalsession:{
      type: Number,
     // required: true,
      trim: true,
      default:0,
  },
  status:{
    type: String,
   // required: true,
    trim: true,
    
},  
  active:{
    type: String,
  }
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("containerservice", ContainerServiceSchema);
