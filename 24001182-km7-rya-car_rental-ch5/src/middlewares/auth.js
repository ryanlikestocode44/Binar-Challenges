const { z } = require("zod");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  Unauthorized,
  Forbidden,
} = require("../utils/request");
const userRepository = require("../repositories/users");

exports.authorization =
  (...roles) =>
  (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new Unauthorized("Missing authorization header");
    }

    const splitAuthHeader = authHeader.split(" ");
    if (splitAuthHeader.length <= 1) {
      throw new Unauthorized("Token is not valid");
    }

    const token = splitAuthHeader[1];

    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = userRepository.getUserById(extractedToken.userId);

    const accessValidation = roles.includes(user.roleId);
    if (!accessValidation) {
      throw new Forbidden("You don't have access to this resource");
    }

    req.user = user;
    next();
  };

exports.validateRegister = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

  // upload file is not required
  const validateFileBody = z
    .object({
      profilePicture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const validateBodyResult = validateBody.safeParse(req.body);
  if (!validateBodyResult.success) {
    // If validation fails, return error messages
    throw new BadRequestError(validateBodyResult.error.errors);
  }

  // Validate
  const validateFilesResult = validateFileBody.safeParse(req.files);
  if (!validateFilesResult.success) {
    // If validation fails, return error messages
    throw new BadRequestError(validateFilesResult.error.errors);
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  // validate
  const validateBodyResult = validateBody.safeParse(req.body);
  if (!validateBodyResult.success) {
    // If validation fails, return error messages
    throw new BadRequestError(validateBodyResult.error.errors);
  }

  next();
};
