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

     //  booknote,
   
      } = req.body;
     // if (!images) return res.status(400).json({ msg: "No image upload" });
    //  const product = await Booking.findOne({ product_id });
      // if (product)
      //   return res.status(400).json({ msg: "This product already exists." });
      const newBooking = new Booking({
        email,
        bookdate,
        service,
        namecustomer,
        phonenumber,
        namestaff,
        numbertime,
      //  booknote,
      });

      await newBooking.save(); 
      res.json({ msg: "Created a booking" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Booking" });
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
     //  namestaff,
       namecustomer,
       phonenumber,
     //  booknote,
     numbertime,
       
      } = req.body;
     // if (!images) return res.status(400).json({ msg: "No image upload" });
      await Booking.findOneAndUpdate(
        { _id: req.params.id },
        {
          email,
         bookdate,
     service,
     //  namestaff,
       namecustomer,
       phonenumber,
       numbertime,
     //  booknote,
        }
      );
      res.json({ msg: "Updated a Booking" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
};

module.exports = bookingCtrl;
