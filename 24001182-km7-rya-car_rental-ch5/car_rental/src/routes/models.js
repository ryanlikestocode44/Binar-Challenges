const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetAllModels,
  validateGetModelById,
  validateAddModel,
  validateUpdateModel,
  validateDeleteModelById,
} = require("../middlewares/models");
const {
  getAllModels,
  getModelById,
  addNewModel,
  updateModel,
  deleteModelById,
} = require("../controllers/models");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetAllModels, getAllModels)
  .post(authorization(adminRole), validateAddModel, addNewModel);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetModelById, getModelById)
  .put(authorization(adminRole), validateUpdateModel, updateModel)
  .delete(authorization(adminRole), validateDeleteModelById, deleteModelById);

module.exports = router;
