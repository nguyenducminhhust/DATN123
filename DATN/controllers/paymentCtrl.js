const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Services = require("../models/serviceModel");

const PaymentCtrl = {
  getPayment: async (req, res) => {
    try {
      const payment = await Payments.find();
      res.json(payment);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "Người dùng đã tồn tại" });

      const { cart, paymentID, address, status } = req.body;

      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
        status,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      await newPayment.save();
      res.json({ msg: "Thanh toán thành công!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
            await Payments.findOneAndUpdate(
            { paymentID: req.body.paymentID },
            {
                status: req.body.status,
            }
        );
        res.json({ msg: "Cập nhật trạng thái thành công!" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Services.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};
module.exports = PaymentCtrl;
