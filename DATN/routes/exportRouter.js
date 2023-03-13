const router = require("express").Router();
const exportexportcostCtrl = require("../controllers/exportcostCtrl");
router
  .route("/exports")
  .get(exportexportcostCtrl.getExportcost)
  .post(exportexportcostCtrl.createExportcost);

router
  .route("/exports/:id") 
  .delete(exportexportcostCtrl.deleteExportcost)
  .put(exportexportcostCtrl.updateExportcost);
module.exports = router;
