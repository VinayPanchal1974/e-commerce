const authModel = require("../../Model/Auth/AuthModel");
const { expireTokenTime, comparePassword } = require("../../Utils/Utils");
const jwt = require("jsonwebtoken");
exports.signup = async (request, response) => {
  try {
    const body = request.body;
    const data = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    };
    const dbRes = await authModel.create(data);
    if (dbRes) {
      return response.status(200).json({
        status: "success",
        message: "user registred",
        data: dbRes,
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "server error",
      error: error,
    });
  }
};

exports.signin = async (request, response) => {
  try {
    const body = request.body;

    const filter = {
      email: body.email,
    };
    const dbRes = await authModel.findOne(filter, {
      name: 1,
      email: 1,
      password: 1,
      _id:1
    });
    
    if (dbRes) {
      if (comparePassword(body.password, dbRes.password)) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const bindKey = {
          time: Date(),
          name: dbRes.name,
          password: dbRes.password,
          email: dbRes.email,
          _id:dbRes._id,
        };
        const token = jwt.sign(bindKey, secretKey, expireTokenTime());
        return response.status(200).json({
          status: "success",
          message: "user found",
          data: {
            name: dbRes.name,
            email: dbRes.email,
          },
          token: token,
        });
      } else {
        return response.status(401).json({
          status: "failed",
          message: "incorrect password",
        });
      }
    } else {
      return response.status(404).json({
        status: "failed",
        message: "user not found",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: "failed",
      message: "some problem in server",
      error: error,
    });
  }
};
