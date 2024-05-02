const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB)
  .then((res) => {
    console.log(`connected to database`);
  })
  .catch((err) => {
    console.log(`connection to database failed, message: ${err.message}`);
  });
