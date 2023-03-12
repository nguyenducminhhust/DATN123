const Users = require("../models/userModel");
const authStaff = async (req, res, next) => {
    try {
      // Get user information by id
      const user = await Users.findOne({
        _id: req.user.id,
      });
      if (user.role === 2)
        return res.status(400).json({ msg: "Staff resources access denied" });
  
      next();
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };
  module.exports = authStaff;