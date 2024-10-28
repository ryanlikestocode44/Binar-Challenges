const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetAllCars,
  validateGetCarById,
  validateDeleteCarById,
  validateAddCar,
  validateUpdateCar,
} = require("../middlewares/cars");
const {
  getAllCars,
  getCarById,
  deleteCarById,
  addNewCar,
  updateCar,
} = require("../controllers/cars");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetAllCars, getAllCars)
  .post(authorization(adminRole), validateAddCar, addNewCar);

router
  .route("/:id")
  .get(authorization(adminRole, userRole), validateGetCarById, getCarById)
  .put(authorization(adminRole), validateUpdateCar, updateCar)
  .delete(authorization(adminRole), validateDeleteCarById, deleteCarById);

module.exports = router;
