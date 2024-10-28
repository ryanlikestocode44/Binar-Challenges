const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateDeleteManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
} = require("../middlewares/manufactures");
const {
  getManufactures,
  getManufactureById,
  deleteManufactureById,
  createManufacture,
  updateManufacture,
} = require("../controllers/manufactures");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    validateGetManufactures,
    getManufactures
  )
  .post(authorization(adminRole), validateCreateManufacture, createManufacture);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetManufactureById,
    getManufactureById
  )
  .put(authorization(adminRole), validateUpdateManufacture, updateManufacture)
  .delete(
    authorization(adminRole),
    validateDeleteManufactureById,
    deleteManufactureById
  );

module.exports = router;
