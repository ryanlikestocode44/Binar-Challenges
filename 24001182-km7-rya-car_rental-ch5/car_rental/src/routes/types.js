const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetCarTypes,
  validateGetCarTypeById,
  validateCreateCarType,
  validateUpdateCarType,
  validateDeleteCarTypeById,
} = require("../middlewares/types");
const {
  getCarTypes,
  getCarTypeById,
  createCarType,
  updateCarType,
  deleteCarTypeById,
} = require("../controllers/types");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(adminRole, userRole), validateGetCarTypes, getCarTypes)
  .post(authorization(adminRole), validateCreateCarType, createCarType);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetCarTypeById,
    getCarTypeById
  )
  .put(authorization(adminRole), validateUpdateCarType, updateCarType)
  .delete(
    authorization(adminRole),
    validateDeleteCarTypeById,
    deleteCarTypeById
  );

module.exports = router;
