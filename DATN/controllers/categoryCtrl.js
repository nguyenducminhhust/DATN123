const Category = require("../models/categoryModel");
const Services = require("../models/serviceModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "Danh mục này đã tồn tại." });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ msg: "Đã tạo 1 danh mục mới" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const services = await Services.findOne({ category: req.params.id });
      if (services)
        return res.status(400).json({
          msg: "Vui lòng xóa tất cả các quan hệ của danh mục.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa danh mục" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Đã cập nhật danh mục" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = categoryCtrl;
