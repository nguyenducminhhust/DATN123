const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const booklistCtrl = require("../controllers/booklistCtrl");

router
  .route("/booklist")
  .get(booklistCtrl.getBookList)
  .post(auth, authAdmin, booklistCtrl.createBookList);

router
  .route("/booklist/:id")
  .delete(auth, authAdmin, booklistCtrl.deleteBookList)
  .put(auth, authAdmin,booklistCtrl.updateBookList);
module.exports = router;
