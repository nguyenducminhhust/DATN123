const Costs = require("../models/costModel");
const costCtrl = {
  getCost: async (req, res) => {
    try {
      const cost = await Costs.find();
      res.json(cost);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCost: async (req, res) => {
    try {
      const {
        productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount
      } = req.body;
      const cost = await Costs.findOne({ productid });
      if (cost)
        return res.status(400).json({ msg: "Mẫu sản phẩm đã tồn tại." });
      const newCost = new Costs({
        productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount
      });

      await newCost.save(); 
      res.json({ msg: "Đã" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCost: async (req, res) => {
    try {
      await Costs.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa mẫu sản phẩm" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCost: async (req, res) => {
    try {
      const { productid, 
        productname,
        unit,
        quantity,
        unitprice,
        amount } = req.body;
      await Costs.findOneAndUpdate(
        { productid: req.body.productid },
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
      res.json({ msg: "Đã cập nhật mẫu sản phẩm" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = costCtrl;
