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
        timebought,
        paymentid,
        servicename,
        totalsession,
        status,
       } = req.body;
      const newContainerService = new ContainerService({  
        serviceid,
        email,        
        timebought, 
        paymentid,
        servicename,
        totalsession,
        status,
      });

      await newContainerService.save();
      res.json({ msg: "Tạo liệu trình thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteContainerService: async (req, res) => {
    try {
      await ContainerService.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa liệu trình" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateContainerService: async (req, res) => {
    try {
      const { serviceid,
        email,
        timebought, 
        paymentid, } = req.body;
      await ContainerService.findOneAndUpdate({ _id: req.params.id }, { serviceid,
        email,
        timebought, 
        paymentid, });

      res.json({ msg: "Đã cập nhật liệu trình" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    addDetailProcess: async (req, res) => {
    try {
      const cartlength = req.body.adddetailprocessinfo.length;
      for(let i=0; i<cartlength; i++){
      await ContainerService.findOneAndUpdate(
        { _id: req.params.id }, 
        {  
          $push: { detailprocess: req.body.adddetailprocessinfo[i]},
        });
   
      }
      return res.json({ msg: "Đã thêm chi tiết liệu trình" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

};
module.exports = containerserviceCtrl;
