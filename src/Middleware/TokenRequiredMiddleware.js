const jwt = require("jsonwebtoken");

exports.verifyAuth = async (request, response, next) => {
  const token =
    request.body.token ||
    request.query.token ||
    request.headers["authorization"];
  if (!token) {
    return response.status(401).json({
      status: "failed",
      message: "token required",
    });
  }
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decodeToken = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);
    request.user = decodeToken;
  } catch {
    return response.status(401).json({
      status: "failed",
      message: "token was expired",
    });
  }

  return next();
};
