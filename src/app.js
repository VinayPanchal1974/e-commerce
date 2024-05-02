const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./Route/Auth/AuthRouter");
const productRouter = require("./Route/Product/ProductRouter");
const cartRouter = require("./Route/Cart/CartRouter");
const paymentRouter = require("./Route/Payment/PaymentRouter");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // store: MongoStore.create({
    //   mongoUrl: "mongodb://127.0.0.1:27017/sessiondb",
    // }),
    // cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/", paymentRouter);
app.use("/images", express.static(__dirname + "/public/uploads/"));

// app.use((req, res, next) => {
//   req.sessionStore.off("destroy", async (sessionId) => {
//     await Cart.deleteOne({ sessionId });
//   });
//   next();
// });

module.exports = app;
