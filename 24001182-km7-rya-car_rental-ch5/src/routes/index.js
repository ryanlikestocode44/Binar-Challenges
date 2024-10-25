const express = require("express");
const authRouter = require("./auth");
const carsRouter = require("./cars");
const modelsRouter = require("./models");
const manufacturesRouter = require("./manufactures");
const transmissionsRouter = require("./transmissions");
const typesRouter = require("./types");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cars", carsRouter);
router.use("/models", modelsRouter);
router.use("/manufactures", manufacturesRouter);
router.use("/transmissions", transmissionsRouter);
router.use("/types", typesRouter);

router.get("/", (req, res) => {
  res.send({
    message: "Ping Succesfully!",
  });
});

module.exports = router;
