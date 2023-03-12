const Dataprocesscustomer = require("../models/dataprocesscustomerModel");



const dataprocesscustomerCtrl = {
  getDataProcessCustomer: async (req, res) => {
    try {
      const dataprocesscustomer = await Dataprocesscustomer.find();
      res.json(dataprocesscustomer);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createDataProcessCustomer: async (req, res) => {
    try {
      const {
        
        session,
        images,
        staff,
        daymake,
        service,
        dataprocesscustomerid,
      } = req.body;
      //res.json(req.body);
     // if (!images) return res.status(400).json({ msg: "No image upload" });
    //  const product = await Booking.findOne({ product_id });
      // if (product)
      //   return res.status(400).json({ msg: "This product already exists." });
      const newDataProcessCustomer = new Dataprocesscustomer({
        
        session,
        images,
        staff,
        daymake,
        service,
       dataprocesscustomerid,
      });

      await newDataProcessCustomer.save(); 
      res.json({ msg: "Created a Dataprocesscustomer" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteDataProcessCustomer: async (req, res) => {
    try {
      await Dataprocesscustomer.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Dataprocesscustomer" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDataProcessCustomer: async (req, res) => {
    try {
      const { 
      //  dataprocesscustomerid,
        session,
        images,
        staff,
        daymake,
        service,
      } = req.body;
     // if (!images) return res.status(400).json({ msg: "No image upload" });
      await Dataprocesscustomer.findOneAndUpdate(
        { _id: req.params.id },
        {
            //dataprocesscustomerid,
            session,
            images,
            staff,
            daymake,
            service,
        }
      );
      res.json({ msg: "Updated a Dataprocesscustomer" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
}


module.exports = dataprocesscustomerCtrl;
