const express = require("express");
const { signup, signin } = require("../../Controller/Auth/AuthController");
const authRouter = express.Router();

authRouter.post("/signup",signup)
authRouter.post("/signin",signin)

module.exports = authRouter;
