import * as carService from "../services/cars.js"; // import semua function carService
import { successResponse } from "../utils/response.js"; // import function successResponse

// Controller untuk dapatkan semua data cars
export const getAllCars = (req, res, next) => {
  // Dapatkan data cars dari empat parameter query dibawah
  const data = carService.getAllCars(
    req.query?.rentPerDay,
    req.query?.capacity,
    req.query?.availableAt,
    req.query?.year
  );

  successResponse(res, "Successfully Get All Cars Data", data);
};

// Controller untuk dapatkan data car dari id
export const getCarById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.getCarById(id);
  successResponse(res, "Successfully Get a Car Data", data);
};

// Controller untuk tambahkan data car baru dengan req.body
export const addNewCar = async (req, res, next) => {
  const requestBody = {
    ...req.body
  };

  const data = await carService.addNewCar(requestBody, req.files);
  successResponse(res, "Successfully Added a New Car", data);
};

// Controller untuk update data car dari id dan req.body
export const updateCar = async (req, res, next) => {
  const { id } = req.params;
  const requestBody = {
    ...req.body
  };

  const data = await carService.updateCar(id, requestBody, req.files);
  successResponse(res, "Successfully Updated a Car Data", data);
};

// Controller untuk delete data car dari id
export const deleteCarById = (req, res, next) => {
  const { id } = req.params;
  const data = carService.deleteCarById(id);
  successResponse(res, "Successfully Deleted a Car Data", data);
};
