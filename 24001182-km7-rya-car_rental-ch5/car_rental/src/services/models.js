const modelRepository = require("../repositories/models");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getAllModels = async (name, year, rentPerDay) => {
  return modelRepository.getAllModels(name, year, rentPerDay);
};

exports.getModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  }

  return existingModel;
};

exports.addNewModel = async (data) => {
  return modelRepository.addNewModel(data);
};

exports.updateModel = async (id, data) => {
  const existingModel = modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  }

  data = {
    ...existingModel,
    ...data,
  };

  const updatedModel = modelRepository.updateModel(id, data);
  if (!updatedModel) {
    throw new InternalServerError(["Failed to update model"]);
  }

  return updatedModel;
};

exports.deleteModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  }

  const deletedModel = await modelRepository.deleteModelById(id);
  if (!deletedModel) {
    throw new InternalServerError(["Failed to update model"]);
  }

  return deletedModel;
};
