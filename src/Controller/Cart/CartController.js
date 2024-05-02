const cartModel = require("../../Model/Cart/CartModel");

exports.addCart = async (request, response) => {
  try {
    const body = request.body;

    const postData = {
      userId: body.userId || null,
      items: [
        {
          productId: body.productId,
        },
      ],
    };
    const filter = {
      userId: body.userId,
    };
    const findUser = await cartModel.findOne(filter);
    if (!findUser) {
      const dbRes = await cartModel.create(postData);
      if (dbRes) {
        return response.status(200).json({
          status: "success",
          message: "added to cart",
          data: dbRes,
        });
      }
    }
    if (findUser.userId == body.userId) {
      if (findUser.items.some((ele) => ele.productId == body.productId)) {
        const filter1 = {
          $and: [filter, { "items.productId": body.productId }],
        };
        const updateData = {
          $inc: { "items.$.quantity": 1 },
        };
        const dbRes = await cartModel.updateOne(filter1, updateData);
        if (
          dbRes.acknowledged === true &&
          dbRes.modifiedCount === 1 &&
          dbRes.matchedCount === 1
        ) {
          return response.status(200).json({
            status: "success",
            message: "quantity increased by 1",
          });
        }
      } else {
        const dbRes = await cartModel.updateOne(filter, {
          $push: {
            items: {
              productId: body.productId,
              quantity: 1,
            },
          },
        });
        if (
          dbRes.acknowledged === true &&
          dbRes.modifiedCount === 1 &&
          dbRes.matchedCount === 1
        ) {
          return response.status(200).json({
            status: "success",
            message: "product added to cart",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: "failed",
      message: "failed to post cart",
      error: error,
    });
  }
};
