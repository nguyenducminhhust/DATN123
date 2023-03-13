const router = require("express").Router();
const staffScheduleCtrl = require("../controllers/staffScheduleCtrl");
router
  .route("/staffschedule")
  .get(staffScheduleCtrl.getStaffSchedule)
  .post(staffScheduleCtrl.createStaffSchedule);
  

router
  .route("/staffschedule/:id") 
  .delete(staffScheduleCtrl.deleteStaffSchedule)
router.route("/staffschedule").put(staffScheduleCtrl.updateStaffSchedule);
router.route("/staffschedule").patch(staffScheduleCtrl.updateLostTimeNumber);
module.exports = router;
