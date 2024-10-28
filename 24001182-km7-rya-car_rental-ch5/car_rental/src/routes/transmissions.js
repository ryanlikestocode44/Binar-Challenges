const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissions");
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissions");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    validateGetTransmissions,
    getTransmissions
  )
  .post(
    authorization(adminRole),
    validateCreateTransmission,
    createTransmission
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    validateGetTransmissionById,
    getTransmissionById
  )
  .put(authorization(adminRole), validateUpdateTransmission, updateTransmission)
  .delete(
    authorization(adminRole),
    validateDeleteTransmissionById,
    deleteTransmissionById
  );

module.exports = router;
