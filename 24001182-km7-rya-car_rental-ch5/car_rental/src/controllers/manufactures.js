const manufactureService = require("../services/manufactures");
const { successResponse } = require("../utils/response");

exports.getManufactures = async (req, res, next) => {
  // Call the usecase or service
  const data = await manufactureService.getManufactures(
    req.query?.name,
    req.query?.country
  );
  successResponse(res, "Successfully Get All Manufactures Data", data);
};

exports.getManufactureById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get manufacture by id
  const data = await manufactureService.getManufactureById(id);
  successResponse(res, "Successfully Get A Manufacture Data", data);
};

exports.createManufacture = async (req, res, next) => {
  // Create the new manufacture
  const data = await manufactureService.createManufacture(req.body);
  successResponse(res, "Successfully Added A Manufacture Data", data);
};

exports.updateManufacture = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await manufactureService.updateManufacture(id, req.body);
  successResponse(res, "Successfully Update A Manufacture Data", data);
};

exports.deleteManufactureById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await manufactureService.deleteManufactureById(id);
  successResponse(res, "Successfully Delete A Manufacture Data", data);
};
