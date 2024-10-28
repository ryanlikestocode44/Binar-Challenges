const authService = require("../services/auth");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
  const data = await authService.register(req.body, req.files);
  successResponse(res, "Successfully Created New User", data);
};

exports.login = async (req, res, next) => {
  const data = await authService.login(req.body.email, req.body.password);
  successResponse(res, "Login Successfully", data);
};

exports.getProfile = async (req, res, next) => {
  const data = req.user;

  delete data.password;

  successResponse(res, "Successfully Getting User Profile", data);
};
