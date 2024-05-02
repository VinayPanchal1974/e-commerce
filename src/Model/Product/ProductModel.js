const mongoose = require("mongoose");
const collection = require("../../Config/Collection");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "product name is required"],
    },
    product_title: {
      type: String,
      required: [true, "product title is required"],
    },
    product_price: {
      type: String,
      required: [true, "product price is required"],
    },
    product_description: {
      type: String,
      required: [true, "product description is required"],
    },
    product_photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model(collection.product, productSchema);

module.exports = productModel;
