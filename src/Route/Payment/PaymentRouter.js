const express = require("express");
const {
  renderBuyPage,
  checkout,
  successPage,
  cancelPage,
} = require("../../Controller/Payment/PaymentController");
const { verify } = require("../../Middleware/AuthMiddleware");

const paymentRouter = express.Router();

paymentRouter.get("/pay", verify, checkout);
paymentRouter.get("/success", successPage);
paymentRouter.get("/cancel", cancelPage);

module.exports = paymentRouter;
