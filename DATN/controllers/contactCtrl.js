const Contact = require("../models/contactModel");
const contactCtrl = {
  getContact: async (req, res) => {
    try {
      const contact = await Contact.find();
      res.json(contact);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createContact: async (req, res) => {
    try {
      const {
        contactid,
        email, 
        name,
        phonenumber,
        title,
        content
      } = req.body;
      const newContact = new Contact({
        contactid,
        email, 
        name,
        phonenumber,
        title,
        content
      });

      await newContact.save(); 
      res.json({ msg: "Gửi liên hệ thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteContact: async (req, res) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa liên hệ" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateContact: async (req, res) => {
    try {
      const { 
        contactid,
        email, 
        name,
        phonenumber,
        title,
        content} = req.body;
      await Contact.findOneAndUpdate(
        { _id: req.params.id },
        {
        contactid,
        email, 
        name,
        phonenumber,
        title,
        content
        }
      );
      console.log(req.params);
      res.json({ msg: "Đã cập nhật liên hệ" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = contactCtrl;
