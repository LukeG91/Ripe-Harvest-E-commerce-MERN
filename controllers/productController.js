const Products = require("../models/productModel");

const productController = {
  getProducts: async (req, res) => {
    try {
      res.json("test");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
