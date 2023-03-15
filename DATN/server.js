require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/serviceRouter"));
app.use("/api", require("./routes/paymentRouter"));
app.use("/api", require("./routes/containerserviceRouter"));
app.use("/api", require("./routes/bookingRouter"));
app.use("/api", require("./routes/dataprocesscustomerRouter"));
app.use("/api", require("./routes/staffScheduleRouter"));
app.use("/api", require("./routes/costRouter"));
app.use("/api", require("./routes/contactRouter"));
app.use("/api", require("./routes/exportRouter"));

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.get("/", (req, res) => {
  res.json({ msg: "helloo" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
