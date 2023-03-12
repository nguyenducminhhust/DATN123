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
        return res.status(400).json({ msg: "The email already exists." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });
      }
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
//       const bcrypt = require('bcrypt');

        // async function decodePasswordHash(passwordHash) {
        //   const password = await bcrypt.compare(passwordHash, 10);
        //   return password;
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
      //   res.json({ msg: "Successful" });

      // Then create jsonwebtoken to authentication
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
        balance,
        debt,
      } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "The email already exists." });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });
      }
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
//       const bcrypt = require('bcrypt');

        // async function decodePasswordHash(passwordHash) {
        //   const password = await bcrypt.compare(passwordHash, 10);
        //   return password;
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        role,
        service,
        kindofstaff,
        phonenumber,
        salary,
        balance,
        debt,
      });
      // Save mongodb
      await newUser.save();
     

      // Then create jsonwebtoken to authentication
      // const accesstoken = createAccessToken({ id: newUser._id });

      // const refreshtoken = createRefreshToken({ id: newUser._id });

      // res.cookie("refreshtoken", refreshtoken, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      // });

      res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      // If login success , create access token and refresh token
      //res.json({ msg: "Login success" });
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
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

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
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
      //res.json(req.user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  //   try {
  //     const user = await Users.find();
  //     res.json(user);
  // } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  // }
  },
  getAllStaff: async(req, res) => {
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
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDebt: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          debt: req.body.handledebt,
        }
      );

      return res.json({ msg: "Update Debt Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  modifyDebt: async (req, res) => {
    try {
    //  const {userid} = req.body;
      // if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.body._id },
        {
          debt: req.body.handledebt,
        }
      );

      return res.json({ msg: "Update Debt Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addServiceBought: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const cartlength = req.body.cartupdate.length;
      for(let i=0; i<cartlength; i++){
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          

          
          $push: { servicebought: req.body.cartupdate[i] },
        }
      );
      }
      return res.json({ msg: "Added to servicebought" });
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
      // if (!images) return res.status(400).json({ msg: "No image upload" });
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
      res.json({ msg: "Updated infor Staff" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      // const { _id } = req.body;
      await Users.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a User" });
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
