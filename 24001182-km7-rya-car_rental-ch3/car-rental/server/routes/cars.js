import express from "express";

import {
  validateGetAllCars,
  validateGetCarById,
  validateAddCar,
  validateUpdateCar,
  validateDeleteCarById
} from "../middleware/cars.js";

import {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCarById
} from "../controllers/cars.js";

export const router = express.Router();

router.get("/", validateGetAllCars, getAllCars);
router.get("/:id", validateGetCarById, getCarById);
router.post("/", validateAddCar, addNewCar);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarById, deleteCarById);