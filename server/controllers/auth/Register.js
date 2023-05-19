const UserModel = require("../../models/users");
const bcrypt = require("bcryptjs");
const registerValidation = require("../../validation/usersValidation");
const { nodeMailer } = require("../../config/nodeMailer");

function generatePassword(length) {
  var charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

const Register = async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "User exist";
          res.status(404).json(errors);
        } else {
          const password = generatePassword(10);
          const hash = bcrypt.hashSync(password, 10); //hashed password
          req.body.password = hash;
          req.body.roles = req.body.roles.map((role) => role.value);
          const data = await UserModel.create(req.body);
          await nodeMailer(req.body.email, "Password Taskify", password);
          res.status(200).json({ message: "Success", data });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = Register;
