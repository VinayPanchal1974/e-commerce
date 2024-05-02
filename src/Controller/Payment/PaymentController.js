const paypal = require("paypal-rest-sdk");
const cartModel = require("../../Model/Cart/CartModel");
const productModel = require("../../Model/Product/ProductModel");

var storePrice = 0;

require("dotenv").config();

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_KEY,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});


exports.checkout = async (request, response) => {
  try {
    const { _id } = request.user;
    const filter = {
      userId: _id,
    };
    const finalCheckOutArr = [];
    const dbRes = await cartModel.findOne(filter);
    const checkoutArr = dbRes.items;
    for (let i = 0; i < checkoutArr.length; i++) {
      const getProduct = await productModel.findOne({
        _id: checkoutArr[i].productId,
      });
      const totalPrice = checkoutArr[i].quantity * getProduct.product_price;
      finalCheckOutArr.push(totalPrice);
    }
    const finalPrice = finalCheckOutArr.reduce((a, b) => {
      return a + b;
    });
    storePrice = finalPrice;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:8002/success",
        cancel_url: "http://localhost:8002/cancel",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Book",
                sku: "001",
                price: `${finalPrice}.00`,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: `${finalPrice}.00`,
          },
          description: "Hat for the best team ever",
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            response.redirect(payment.links[i].href);
          }
        }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.successPage = async (request, response) => {
  try {
    const payerId = request.query.PayerID;
    const paymentId = request.query.paymentId;
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: `${storePrice}.00`,
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          return response.status(400).json({
            status: "failed",
            message: error.response,
            error: error,
          });
        } else {
          return response.status(200).json({
            status: "success",
            details: JSON.stringify(payment),
          });
        }
      }
    );
  } catch (error) {
    return response.status(400).json({
      status: "failed",
      message: error.message,
      error: error,
    });
  }
};

exports.cancelPage = async (request, response) => {
  try {
    return response.status(204).json({
      message: "request canceled",
    });
  } catch (error) {
    return response.status(500).json({
      error: error,
    });
  }
};
