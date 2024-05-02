const mongoose = require("mongoose");
const collection = require("../../Config/Collection");
const { passwordEncoded } = require("../../Utils/Utils");
require("../../Config/Db");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", function () {
  this.password = passwordEncoded(this.password);
});

const authModel = mongoose.model(collection.auth, authSchema);
module.exports = authModel;
