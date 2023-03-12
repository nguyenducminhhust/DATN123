const router = require("express").Router();
const contactCtrl = require("../controllers/contactCtrl");
router
  .route("/contacts")
  .get(contactCtrl.getContact)
  .post(contactCtrl.createContact);

router
  .route("/contacts/:id") 
  .delete(contactCtrl.deleteContact)
  .put(contactCtrl.updateContact);
module.exports = router;
