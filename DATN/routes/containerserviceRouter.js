const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const containerserviceCtrl = require("./../controllers/containerserviceCtrl");

router
  .route("/containerservice")
  .get(containerserviceCtrl.getContainerService)
  .post( containerserviceCtrl.createContainerService); //auth, authAdmin,

router
  .route("/containerservice/:id")
  .delete(auth, authAdmin, containerserviceCtrl.deleteContainerService)
  .put(auth, authAdmin,containerserviceCtrl.updateContainerService);
router.patch("/adddetailprocess/:id", containerserviceCtrl.addDetailProcess);
module.exports = router;
