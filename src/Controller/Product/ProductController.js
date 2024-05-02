const productModel = require("../../Model/Product/ProductModel");

exports.createProduct = async (request, response) => {
  try {
    const body = request.body;
    const img = request.imagePath;
    const allProduct = {
      product_name: body.product_name,
      product_title: body.product_title,
      product_price: body.product_price,
      product_description: body.product_description,
      product_photo: img,
    };
    const dbRes = await productModel.create(allProduct);
    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "add product successfully",
        data: dbRes,
      });
    }
  } catch (err) {
    return response.status(500).json({
      status: "failed",
      message: "failed to product",
      error: err,
    });
  }
};

exports.getProduct = async (request, response) => {
  try {
    let dbRes = await productModel.find();
    dbRes = dbRes.map((ele) => {
      ele.product_photo = `http://${process.env.HOST}:${process.env.PORT}/images/${ele.product_photo}`;
      return ele;
    });
    if (dbRes.length === 0) {
      return response.status(200).json({
        status: "success",
        message: "no product available",
      });
    }
    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "get product successfully",
        data: dbRes,
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "failed to get product",
    });
  }
};

exports.singleProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const dbRes = await productModel.findOne({ _id: id });
    if (dbRes === null) {
      return response.status(200).json({
        status: "success",
        message: "no product available",
      });
    }
    dbRes.product_photo = `http://${process.env.HOST}:${process.env.PORT}/images/${dbRes.product_photo}`;

    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "find single caytegory successfully",
        data: dbRes,
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to get single product",
    });
  }
};

exports.deleteProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const dbRes = await productModel.deleteOne({ _id: id });
    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "delete product successfully",
      });
    }
  } catch {
    return response.status(500).json({
      status: "failed",
      message: "failed to delete product",
    });
  }
};

exports.updateProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const img = request.imagePath;
    const updatedata = {
      product_name: body.product_name,
      product_title: body.product_title,
      product_price: body.product_price,
      product_description: body.product_description,
      product_photo: img,
    };
    const dbRes = await productModel.updateOne(
      { _id: id },
      { $set: updatedata }
    );
    if (dbRes.acknowledged === true && dbRes.modifiedCount === 1) {
      return response.status(200).json({
        status: "success",
        message: "update successfully",
        data: dbRes,
      });
    } else {
      return response.status(422).json({
        status: "failed",
        message: "updation failed",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "failed to update",
    });
  }
};
