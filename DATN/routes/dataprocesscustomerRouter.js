const router = require("express").Router();
const dataprocesscustomerCtrl = require("../controllers/dataprocesscustomerCtrl");
router
  .route("/dataprocesscustomers")
  .get(dataprocesscustomerCtrl.getDataProcessCustomer)
  .post(dataprocesscustomerCtrl.createDataProcessCustomer);

router
  .route("/dataprocesscustomers/:id") 
  .delete(dataprocesscustomerCtrl.deleteDataProcessCustomer)
  .put(dataprocesscustomerCtrl.updateDataProcessCustomer);

module.exports = router;
