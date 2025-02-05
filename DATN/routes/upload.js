const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// Tải ảnh lên cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
router.post("/upload", auth, authAdmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "Không có tập tin nao được tải lên." });
    }
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Kích thước" });
    }
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/webp"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Định dạng tệp không chính xác." });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
    console.log(req.files);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Lấy dữ liệu về
router.get("/download", auth, authAdmin, (req, res) => {
  try {
    cloudinary.v2.api.resources({ type: "upload" }, async (err, result) => {
      if (err) throw err;
      res.json({ public_id: result.public_id, url: result.url });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
// Delete image only admin can use
router.post("/destroy", auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "Không có hình ảnh nào được chọn" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Đã xóa hình ảnh" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
