const manufactureService = require("../services/manufactures");
const { successResponse } = require("../utils/response");

exports.getManufactures = async (req, res, next) => {
    // Call the usecase or service
    const data = await manufactureService.getManufactures(
        req.query?.name,
        req.query?.country
    );
    successResponse(res, data);
};

exports.getManufactureById = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    // Get student by id
    const data = await manufactureService.getManufactureById(id);
    successResponse(res, data);
};

exports.createManufacture = async (req, res, next) => {
    // Create the new student
    const data = await manufactureService.createManufacture(req.body);
    successResponse(res, data);
};

exports.updateManufacture = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await manufactureService.updateManufacture(id, req.body);
    successResponse(res, data);
};

exports.deleteManufactureById = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await manufactureService.deleteManufactureById(id);
    successResponse(res, data);
};
