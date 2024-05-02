const express = require("express");
const { addCart } = require("../../Controller/Cart/CartController");
const cartRouter = express.Router();

cartRouter.post("/addToCart", addCart);

module.exports = cartRouter;
