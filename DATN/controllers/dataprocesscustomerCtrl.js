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
      const newDataProcessCustomer = new Dataprocesscustomer({
        
        session,
        images,
        staff,
        daymake,
        service,
       dataprocesscustomerid,
      });

      await newDataProcessCustomer.save(); 
      res.json({ msg: "Tạo dữ liệu điều trị thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteDataProcessCustomer: async (req, res) => {
    try {
      await Dataprocesscustomer.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa dữ liệu điều trị" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDataProcessCustomer: async (req, res) => {
    try {
      const { 
        session,
        images,
        staff,
        daymake,
        service,
      } = req.body;
      await Dataprocesscustomer.findOneAndUpdate(
        { _id: req.params.id },
        {
            session,
            images,
            staff,
            daymake,
            service,
        }
      );
      res.json({ msg: "Đã cập nhật dữ liệu điều trị" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
}


module.exports = dataprocesscustomerCtrl;
