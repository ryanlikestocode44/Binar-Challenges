import * as carRepository from "../repository/cars.js";
import { imageUpload } from "../utils/image-kit.js";
import { NotFoundError, InternalServerError } from "../utils/request.js";

export const getAllCars = (rentPerDay, capacity, availableAt, year) => {
  return carRepository.getAllCars(rentPerDay, capacity, availableAt, year);
};

export const getCarById = (id) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  return existingCar;
};

export const addNewCar = async (data, file) => {
  //Upload file
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  };

  return carRepository.addNewCar(data);
};

export const updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarById(id)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  // tetapkan data car yang sudah ada dengan data car yang baru
  data = {
    ...existingCar, // existing car data
    ...data, // updated car data
  };
  
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  }
  /*
  if (file && file.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  };
  */
  const updatedCar = carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car"]);
  };

  return updatedCar;
};

export const deleteCarById = (id) => {
  const existingCar = carRepository.getCarById(id)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  const deletedCar = carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to update car"]);
  };

  return existingCar;
};