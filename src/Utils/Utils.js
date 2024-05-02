const bcrypt = require("bcryptjs");

exports.passwordEncoded = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (newPass, oldPass) => {
  return bcrypt.compareSync(newPass, oldPass);
};

exports.expireTokenTime = () => {
  return { expiresIn: "30d" };
};