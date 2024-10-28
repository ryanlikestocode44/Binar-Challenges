const transmissionService = require("../services/transmissions");
const { successResponse } = require("../utils/response");

exports.getTransmissions = async (req, res, next) => {
  // Call the usecase or service
  const data = await transmissionService.getTransmissions(
    req.query?.name,
    req.query?.driveType,
    req.query?.description
  );
  successResponse(res, "Successfully Get All Transmissions Data", data);
};

exports.getTransmissionById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get transmission by id
  const data = await transmissionService.getTransmissionById(id);
  successResponse(res, "Successfully Get A Transmission Data", data);
};

exports.createTransmission = async (req, res, next) => {
  // Create the new transmission
  const data = await transmissionService.createTransmission(req.body);
  successResponse(res, "Successfully Added A Transmission Data", data);
};

exports.updateTransmission = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await transmissionService.updateTransmission(id, req.body);
  successResponse(res, "Successfully Updated A Transmission Data", data);
};

exports.deleteTransmissionById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await transmissionService.deleteTransmissionById(id);
  successResponse(res, "Successfully Deleted A Transmission Data", data);
};
