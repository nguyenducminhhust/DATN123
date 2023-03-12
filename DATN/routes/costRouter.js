const router = require("express").Router();
const costCtrl = require("../controllers/costCtrl");
router
  .route("/costs")
  .get(costCtrl.getCost)
  .post(costCtrl.createCost);

router
  .route("/costs/:id") 
  .delete(costCtrl.deleteCost)
  .put(costCtrl.updateCost);
module.exports = router;
