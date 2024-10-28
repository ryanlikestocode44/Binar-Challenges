const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

// Controller untuk dapatkan semua data cars
exports.getAllCars = async (req, res, next) => {
  // Dapatkan data cars dari empat parameter query dibawah
  const data = await carService.getAllCars(
    req.query?.plate,
    req.query?.available,
    req.query?.availableAt
  );

  successResponse(res, "Successfully Get All Cars Data", data);
};

// Controller untuk dapatkan data car dari id
exports.getCarById = async (req, res, next) => {
  const { id } = req.params;

  const data = await carService.getCarById(id);
  successResponse(res, "Successfully Get a Car Data", data);
};

// Controller untuk tambahkan data car baru dengan req.body
exports.addNewCar = async (req, res, next) => {
  const data = await carService.addNewCar(req.body, req.files);
  successResponse(res, "Successfully Added a New Car", data);
};

// Controller untuk update data car dari id dan req.body
exports.updateCar = async (req, res, next) => {
  const { id } = req.params;

  const data = await carService.updateCar(id, req.body, req.files);
  successResponse(res, "Successfully Updated a Car Data", data);
};

// Controller untuk delete data car dari id
exports.deleteCarById = async (req, res, next) => {
  const { id } = req.params;

  const data = await carService.deleteCarById(id);
  successResponse(res, "Successfully Deleted a Car Data", data);
};
