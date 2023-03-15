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
            const newstaffschedule = new StaffSchedule({
                email,
                daywork,
                service,
                arraytimework,
                namestaff,
            });

            await newstaffschedule.save();
            res.json({ msg: "Đã tạo lịch nhân viên" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteStaffSchedule: async (req, res) => {
        try {
            await StaffSchedule.findByIdAndDelete(req.params.id);
            res.json({ msg: "Đã xóa lịch nhân viên" });
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
                namestaff,
            } = req.body;
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
            res.json({ msg: "Đã cập nhật lịch nhân viên" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateLostTimeNumber: async (req, res) => {
        try {
            const {      
                arraytimework,
            } = req.body;
            await StaffSchedule.findOneAndUpdate(
                { _id: req.body._id },
                {
                    arraytimework: arraytimework,
                }
            );
            res.json({ msg: "Đã cập nhật lịch nhân viên" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
   
};

module.exports = staffScheduleCtrl;
