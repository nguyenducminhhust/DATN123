const Services = require("../models/serviceModel");

// Filter, sorting and paginating
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {

    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    
    let queryStr = JSON.stringify(queryObj);
    
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // console.log(queryStr);
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
   
    // console.log(test.title, typeof test.title);
    this.query.find(JSON.parse(queryStr));
    
      // console.log(JSON.parse(queryStr));
     
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

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // console.log(this.query)
    return this;
  }
}

const serviceCtrl = {
  getServices: async (req, res) => {
    try {
      const features = new APIfeatures(Services.find(), req.query)
        .filtering()
        .sorting()
        // .paginating();
        
        // res.json({
        //   features: features.query,
        // });
      const services = await features.query;
      res.json({
        status: "success",
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
      if (!images) return res.status(400).json({ msg: "No image upload" });
      const service = await Services.findOne({ service_id });
      if (service)
        return res.status(400).json({ msg: "This service already exists." });
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
      res.json({ msg: "Created a service" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteService: async (req, res) => {
    try {
      await Services.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Service" });
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
      if (!images) return res.status(400).json({ msg: "No image upload" });
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
      res.json({ msg: "Updated a Service" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
};

module.exports = serviceCtrl;
