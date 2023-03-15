const Services = require("../models/serviceModel");

// Filter, sorting
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    //queryString = req.query
    const queryObj = { ...this.queryString }; 
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));     
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
}

const serviceCtrl = {
  getServices: async (req, res) => {
    try {
      const features = new APIfeatures(Services.find(), req.query)
        .filtering()
        .sorting()
      const services = await features.query;
      res.json({
        status: "Thành công",
        result: services.length,
        services: services,
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createService: async (req, res) => {
    try {
      const {
        service_id,
        title,
        price,
        durationtime,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "Ảnh chưa tải lên" });
      const service = await Services.findOne({ service_id });
      if (service)
        return res.status(400).json({ msg: "Dịch vụ này đã tồn tại." });
      const newService = new Services({
        service_id,
        title: title.toLowerCase(),
        price,
        durationtime,
        description,
        content,
        images,
        category,
      });

      await newService.save(); 
      res.json({ msg: "Đã tạo dịch vụ" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteService: async (req, res) => {
    try {
      await Services.findByIdAndDelete(req.params.id);
      res.json({ msg: "Đã xóa dịch vụ" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateService: async (req, res) => {
    try {
      const { title,
        price,
        durationtime,
        description,
        content,
        images,
        category, } = req.body;
      if (!images) return res.status(400).json({ msg: "Ảnh chưa tải lên" });
      await Services.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          durationtime,
          description,
          content,
          images,
          category,
        }
      );
      console.log(req.params);
      res.json({ msg: "Đã cập nhật dịch vụ" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
};

module.exports = serviceCtrl;
