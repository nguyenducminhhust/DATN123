const ContainerService = require("../models/containerserviceModel")


const containerserviceCtrl = {
  getContainerService: async (req, res) => {
    try {
      const containerservices = await ContainerService.find();
      res.json(containerservices);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createContainerService: async (req, res) => {
    try {
      const { 
        serviceid,
        email,
        
       
        //detailprocess,
        timebought,
        paymentid,
        servicename,
        totalsession,
       } = req.body;
      // const containerservice = await ContainerService.findOne({ serviceid });
      // if (containerservice)
      //   return res.status(400).json({ msg: "This containerservice already exists." });

      const newContainerService = new ContainerService({  
        serviceid,
        email,
        
        
       // detailprocess,
        timebought, 
        paymentid,
        servicename,
        totalsession,
      });

      await newContainerService.save();
      res.json({ msg: "Created a containerservice" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteContainerService: async (req, res) => {
    try {
      await ContainerService.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a containerservice" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateContainerService: async (req, res) => {
    try {
      const { serviceid,
        email,
       // detailprocess,
        timebought, 
        paymentid, } = req.body;
      await ContainerService.findOneAndUpdate({ _id: req.params.id }, { serviceid,
        email,
       // detailprocess,
        timebought, 
        paymentid, });

      res.json({ msg: "Updated a containerservice" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    addDetailProcess: async (req, res) => {
    try {
      // const dataprocesscustomer = await ContainerService.findById(req.params.id);
      //  if (!dataprocesscustomer) return res.status(400).json({ msg: "User does not exist." });
      const cartlength = req.body.adddetailprocessinfo.length;
      for(let i=0; i<cartlength; i++){
      await ContainerService.findOneAndUpdate(
        { _id: req.params.id }, 
        {  
          $push: { detailprocess: req.body.adddetailprocessinfo[i]},
        });
   
      }
      return res.json({ msg: "Added success detail process" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = containerserviceCtrl;
