const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
exports.createUser = async (data) => {
  // encrypt password
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);

  // create new user
  const newUser = await prisma.users.create({
    data,
  });

  // convert BigInt fields to string for safe serialization
  const serializedUser = JSONBigInt.stringify(newUser);
  return JSONBigInt.parse(serializedUser);
};

exports.getUserByEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: { email },
  });

  // convert BigInt fields to string for safe serialization
  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findFirst({
    where: { id },
  });

  // convert BigInt fields to string for safe serialization
  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};