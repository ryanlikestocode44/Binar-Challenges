const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const { Unauthorized } = require("../utils/request");

const createToken = (user) => {
  const payload = { userId: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "72h" }); // expires in 72 hours
  return token;
};

exports.register = async (data, file) => {
  if (file.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  // Buat User Baru
  const user = await userRepository.createUser(data);

  // Generate Token Baru untuk User
  const token = createToken(user);

  // Hapus object password, karena kita tidak ingin user ngelihat password nya di response
  delete user.password;

  // Return Info User dan Token
  return { user, token };
};

exports.login = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Email not found!");
  }

  // compare new password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Unauthorized("Incorrect password!");
  }

  // generate token
  const token = createToken(user);

  // remove password object, otherwise it will be exposed in response
  delete user.password;

  return { user, token };
};