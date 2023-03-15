const Booking = require("../models/bookingModel");
const bookingCtrl = {
  getBookings: async (req, res) => {
    try {
      const booking = await Booking.find();
      res.json(booking);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBooking: async (req, res) => {
    try {
      const {
        email,
        bookdate,
        service,
        namecustomer,
        phonenumber,
        namestaff,
        numbertime,
      } = req.body;
      const newBooking = new Booking({
        email,
        bookdate,
        service,
        namecustomer,
        phonenumber,
        namestaff,
        numbertime,
      });

      await newBooking.save(); 
      res.json({ msg: "Đã đặt được lịch" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa lịch đặt" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBooking: async (req, res) => {
    try {
      const { 
        email,
        bookdate,
        service,
        namecustomer,
        phonenumber,
        numbertime,
      } = req.body;
      await Booking.findOneAndUpdate(
        { _id: req.params.id },
        {
          email,
          bookdate,
          service,
          namecustomer,
          phonenumber,
          numbertime,
        }
      );
      res.json({ msg: "Đã cập nhật lịch đặt" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
};

module.exports = bookingCtrl;
