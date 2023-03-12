const Booklist = require("./../models/booklistModel")


const booklistCtrl = {
  getBookList: async (req, res) => {
    try {
      const booklists = await Booklist.find();
      res.json(booklists);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBookList: async (req, res) => {
    try {
      const { booklist } = req.body;
      // const booklist = await Booklist.findOne({ name });
      // if (booklist)
      //   return res.status(400).json({ msg: "This Booklist already exists." });

      const newBookList = new Booklist({ booklist });

      await newBookList.save();
      res.json({ msg: "Created a Booklist" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBookList: async (req, res) => {
    try {
      await Booklist.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Booklist" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBookList: async (req, res) => {
    try {
      const { booklist } = req.body;
      await Booklist.findOneAndUpdate({ _id: req.params.id }, { booklist });

      res.json({ msg: "Updated a Booklist" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = booklistCtrl;
