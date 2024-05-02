const express = require("express");
const {
  createProduct,
  getProduct,
  singleProduct,
  deleteProduct,
  updateProduct,
} = require("../../Controller/Product/ProductController");
const uploadUserImage = require("../../Middleware/UploadProduct");
const { verifyAuth } = require("../../Middleware/TokenRequiredMiddleware");
const productRouter = express.Router();

productRouter.post(
  "/createProduct",
  uploadUserImage.single("product_photo"),
  createProduct
);
productRouter.get("/getProduct", verifyAuth, getProduct);
productRouter.get("/getSingleProduct/:id", verifyAuth, singleProduct);
productRouter.delete("/deleteSingleProduct/:id", verifyAuth, deleteProduct);
productRouter.put(
  "/updateSingleProduct/:id",
  verifyAuth,
  uploadUserImage.single("product_photo"),
  updateProduct
);

module.exports = productRouter;
