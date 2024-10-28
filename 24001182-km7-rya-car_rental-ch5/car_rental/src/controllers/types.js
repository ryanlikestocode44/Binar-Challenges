const typeService = require("../services/types");
const { successResponse } = require("../utils/response");

exports.getCarTypes = async (req, res, next) => {
  // Call the usecase or service
  const data = await typeService.getCarTypes(
    req.query?.name,
    req.query?.capacity
  );
  successResponse(res, "Successfully Get All Types Data", data);
};

exports.getCarTypeById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // get car type by id
  const data = await typeService.getCarTypeById(id);
  successResponse(res, "Successfully Get A Type Data", data);
};

exports.createCarType = async (req, res, next) => {
  // Create the new car type
  const data = await typeService.createCarType(req.body, req.files);
  successResponse(res, "Successfully Added New Type Data", data);
};

exports.updateCarType = async (req, res, next) => {
  // Get id from params
  const { id } = req.params;
  const data = await typeService.updateCarType(id, req.body, req.files);
  successResponse(res, "Successfully Updated A Type Data", data);
};

exports.deleteCarTypeById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await typeService.deleteCarTypeById(id);
  successResponse(res, "Successfully Deleted A Type Data", data);
};
