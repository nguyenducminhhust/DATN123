const Exportcosts = require("../models/exportModel");
const exportexportcostCtrl = {
  getExportcost: async (req, res) => {
    try {
      const exportexportcost = await Exportcosts.find();
      res.json(exportexportcost);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createExportcost: async (req, res) => {
    try {
      const {
        exportid,
        productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount
      } = req.body;
     
      const newExportcost = new Exportcosts({
        exportid,
        productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount
      });

      await newExportcost.save(); 
      res.json({ msg: "Đã tạo phiếu xuất" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteExportcost: async (req, res) => {
    try {
      await Exportcosts.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa phiếu xuất" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateExportcost: async (req, res) => {
    try {
      const { productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount } = req.body;
      await Exportcosts.findOneAndUpdate(
        { _id: req.params.id },
        {
            productid, 
            productname,
            unit,
            quantity,
            unitprice,
            amount
        }
      );
      console.log(req.params);
      res.json({ msg: "Đã cập nhật phiếu xuất" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = exportexportcostCtrl;
