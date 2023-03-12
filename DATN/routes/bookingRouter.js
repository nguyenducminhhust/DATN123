const router = require("express").Router();
const bookingCtrl = require("../controllers/bookingCtrl");
router
  .route("/bookings")
  .get(bookingCtrl.getBookings)
  .post(bookingCtrl.createBooking);

router
  .route("/bookings/:id") 
  .delete(bookingCtrl.deleteBooking)
  .put(bookingCtrl.updateBooking);
module.exports = router;
