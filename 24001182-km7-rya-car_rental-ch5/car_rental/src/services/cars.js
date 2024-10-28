const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getAllCars = async (plate, available, availableAt) => {
  return carRepository.getAllCars(plate, available, availableAt);
};

exports.getCarById = async (id) => {
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  }

  return existingCar;
};

exports.addNewCar = async (data, file) => {
  // Parse modelId and typeId to numbers
  data.modelId = Number(data.modelId);
  data.typeId = Number(data.typeId);

  // Upload file if provided
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  }

  return carRepository.addNewCar(data);
};

exports.updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  }

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
  }

  return updatedCar;
};

exports.deleteCarById = async (id) => {
  const existingCar = await carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  }

  const deletedCar = await carRepository.deleteCarById(id);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to update car"]);
  }

  return deletedCar;
};
