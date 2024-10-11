import express from "express";
import { router as carsRouter } from "./cars.js";

export const router = express.Router();

router.use("/cars", carsRouter);
