const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .get( paymentCtrl.getPayment) //auth,
  .post(auth, paymentCtrl.createPayment);
  
router.route("/payment").patch(paymentCtrl.updateStatus);
module.exports = router;
