const StaffSchedule = require("../models/staffScheduleModel");

const staffScheduleCtrl = {
    getStaffSchedule: async (req, res) => {
        try {
            const staffschedule = await StaffSchedule.find();
            res.json(staffschedule);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createStaffSchedule: async (req, res) => {
        try {
            const {
                email,
                daywork,
                service,
                arraytimework,
                namestaff,

            } = req.body;
            // if (!images) return res.status(400).json({ msg: "No image upload" });
            //  const product = await Booking.findOne({ product_id });
            // if (product)
            //   return res.status(400).json({ msg: "This product already exists." });
            const newstaffschedule = new StaffSchedule({
                email,
                daywork,
                service,
                arraytimework,
                namestaff,
            });

            await newstaffschedule.save();
            res.json({ msg: "Created a newstaffschedule" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteStaffSchedule: async (req, res) => {
        try {
            await StaffSchedule.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a StaffSchedule" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateStaffSchedule: async (req, res) => {
        try {
            const {
                email,
                daywork,
                service,
                arraytimework,
                namestaff,
                testid,
                test2,
            } = req.body;
            // if (!images) return res.status(400).json({ msg: "No image upload" });
            await StaffSchedule.findOneAndUpdate(
                { _id: req.body.staffchangearray._id },
                {
                    email,
                    daywork,
                    service,
                    arraytimework: req.body.arraytimeworkupdate,
                    namestaff,
                }
            );
            res.json({ msg: "Updated a StaffSchedule" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
   
};

module.exports = staffScheduleCtrl;
