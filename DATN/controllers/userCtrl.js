const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paymentModel");
const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        service,
        kindofstaff,
        phonenumber,
        debt,
      } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Địa chỉ Email đã tồn tại." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Độ dài mật khẩu tối thiểu 6 kí tự." });
      }
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new Users({
        name,
        email,
        password: passwordHash,
        role,
        service,
        kindofstaff,
        phonenumber,
        debt,
      });
      // Save mongodb
      await newUser.save();
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createaccount: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        service,
        kindofstaff,
        phonenumber,
        salary,
        note,
        debt,
      } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Địa chỉ Email đã tồn tại." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Độ dài mật khẩu tối thiểu 6 kí tự." });
      }
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        role,
        service,
        kindofstaff,
        phonenumber,
        salary,
        note,
        debt,
      });
      // Save mongodb
      await newUser.save();
      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Sai mật khẩu." });

      // Nếu đăng nhập thành công , tạo access token và refresh token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Đã đăng xuất" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Vui lòng đăng nhập hoặc đăng ký" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Vui lòng đăng nhập hoặc đăng ký" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
 
  },
  getAllUser: async(req, res) => {
    try {
        const user = await Users.find().select("-password");
        res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
},
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Đã thêm vào giỏ hàng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDebt: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          debt: req.body.handledebt,
        }
      );

      return res.json({ msg: "Đã cập nhật tiền chưa thanh toán" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  modifyDebt: async (req, res) => {
    try {
      await Users.findOneAndUpdate(
        { _id: req.body._id },
        {
          debt: req.body.handledebt,
          note: req.body.handlenote,
        }
      );

      return res.json({ msg: "Đã cập nhật tiền chưa thanh toán thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addServiceBought: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." });
      const cartlength = req.body.cartupdate.length;
      for(let i=0; i<cartlength; i++){
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          

          
          $push: { servicebought: req.body.cartupdate[i] },
        }
      );
      }
      return res.json({ msg: "Đã thêm vào sản phẩm đã mua" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });

      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateStaff: async (req, res) => {
    try {
      const { name,
        email,
        role,
        service,
        kindofstaff,
        phonenumber,
        salary, } = req.body;
      await Users.findOneAndUpdate(
        { email: req.body.email },
        {
        name,
        email,
        role,
        service,
        kindofstaff,
        phonenumber,
        salary,
        }
      );
      console.log(req.params);
      res.json({ msg: "Đã cập nhật thông tin nhân viên" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      res.json({ msg: "Đã xóa người dùng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
