const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verify = async (request, response, next) => {
  const token =
    request.body.token ||
    request.query.token 
    request.headers["authorization"];
  if (!token) {
    return response.status(401).json({
      status: "failed",
      message: "token required",
    });
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.user = decodeToken;
  } catch {
    return response.status(401).json({
      status: "failed",
      message: "token was expired",
    });
  }

  return next();
};
  
// http://localhost:8002/pay?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVGh1IE1heSAwMiAyMDI0IDA5OjE4OjA2IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsIm5hbWUiOiJ2aW5heSIsInBhc3N3b3JkIjoiJDJhJDEwJG1ObjdITVRXNzRONWNKaEk0UmZvSXUuWFE1R24wZUFZWS5nVTZTUVVMQmRvRUtXbDQvTWo2IiwiZW1haWwiOiJ2aW5heUBnbWFpbC5jb20iLCJfaWQiOiI2NjMwZTA2N2Y1NjcxZjBmM2RiZTllNWMiLCJpYXQiOjE3MTQ2MjE2ODYsImV4cCI6MTcxNzIxMzY4Nn0.WTTXrUAgSpAnluE7P0sK8_CIFENrRFmNVPa5nNdWMnQ
