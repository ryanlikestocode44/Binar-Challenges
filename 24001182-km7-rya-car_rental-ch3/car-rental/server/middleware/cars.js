import Joi from 'joi'; // Menggunakan Joi untuk validasi data
import { BadRequestError } from '../utils/request.js'; // Import function BaddRequestError

// Validasi untuk mengambil semua data cars
export const validateGetAllCars = (req, res, next) => {
  // Joi validation
  const validateQuery = (queries) => {
    const schema = Joi.object({
      rentPerDay: Joi.number().positive().optional(),
      capacity: Joi.number().integer().positive().optional(),
      availableAt: Joi.string().isoDate().messages({
        'string.base': 'availableAt must be a string'
      }).optional(),
      year: Joi.number().integer().positive().optional()
    });

    return schema.validate(queries);
  };

  const validateQueryResult = validateQuery(req.query);
  if (validateQueryResult.error) {
    throw new BadRequestError(validateQueryResult.error.details);
  };

  next();
};

// Validasi untuk mengambil data car dari id
export const validateGetCarById = (req, res, next) => {
  // Joi validation
  const validateId = (id) => {
    const schema = Joi.object({
      id: Joi.string()
    });
    return schema.validate(id)
  };

  const validateIdResult = validateId(req.params);

  if (validateIdResult.error) {
    throw new BadRequestError(validateIdResult.error.details);
  };

  next();
};

// Validasi untuk menambah data car baru
export const validateAddCar = (req, res, next) => {
  // Validasi req.body
  const validateCar = (car) => {
    const schema = Joi.object({
      plate: Joi.string(),
      manufacture: Joi.string(),
      model: Joi.string(),
      rentPerDay: Joi.number().positive(),
      capacity: Joi.number().integer().positive(),
      description: Joi.string(),
      availableAt: Joi.string().isoDate().messages({
        'string.base': 'availableAt must be a string'
      }),
      transmission: Joi.string(),
      available: Joi.boolean(),
      type: Joi.string(),
      year: Joi.number().integer().positive(),
      options: Joi.array().items(Joi.string().min(1)).min(1).messages({
        "array.min": "Options cannot be empty"
      }),
      specs: Joi.array().items(Joi.string().min(1)).min(1).messages({
        "array.min": "Specs cannot be empty"
      }),
    });

    return schema.validate(car);
  };

  // Parsing data query
  if (req.body.rentPerDay) {
    req.body.rentPerDay = parseInt(req.body.rentPerDay);
  };

  if (req.body.capacity) {
    req.body.capacity = parseInt(req.body.capacity);
  };

  if (req.body.available) {
    req.body.available = req.body.available == "true" ? true : false;
  };

  if (req.body.year) {
    req.body.year = parseInt(req.body.year);
  };

  // Validasi data file
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = Joi.object({
      image: Joi.object({
        name: Joi.string(),
        data: Joi.any()
      }).optional().allow(null).unknown()
    }).optional().allow(null);

    return schema.validate(file);
  }

  // Dapatkan hasil validasi req.body
  const validateCarResult = validateCar(req.body);
  if (validateCarResult.error) {
    throw new BadRequestError(validateCarResult.error.details);
  };

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (resultValidateFiles.error) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.details);
  };

  next();
};

// Validasi untuk merubah data car
export const validateUpdateCar = (req, res, next) => {
  // Validasi id
  const validateId = (id) => {
    const schema = Joi.object({
      id: Joi.string()
    });
    return schema.validate(id)
  };

  // Dapatkan hasil validasi id
  const validateIdResult = validateId(req.params);
  if (validateIdResult.error) {
    throw new BadRequestError(validateIdResult.error.details);
  };

  // Validasi req.body
  const validateBody = (car) => {
    const schema = Joi.object({
      plate: Joi.string(),
      manufacture: Joi.string(),
      model: Joi.string(),
      rentPerDay: Joi.number(),
      capacity: Joi.number(),
      description: Joi.string(),
      availableAt: Joi.date(),
      transmission: Joi.string(),
      available: Joi.boolean(),
      type: Joi.string(),
      year: Joi.number(),
      options: Joi.array(),
      specs: Joi.array()
    });

    return schema.validate(car);
  };

  // Validasi req.files
  const validateFileBody = (file) => {
    const schema = Joi.object({
      image: Joi.object({
        name: Joi.string(),
        data: Joi.any()
      }).optional().allow(null)
    }).optional().allow(null);

    return schema.validate(file);
  };

  // Dapatkan hasil validasi req.body
  const validateBodyResult = validateBody(req.body);
  if (validateBodyResult.error) {
    throw new BadRequestError(validateBodyResult.error.details);
  };

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (resultValidateFiles.error) {
    throw new BadRequestError(resultValidateFiles.error.details);
  };

  next();
};

// Validasi untuk menghapus data car
export const validateDeleteCarById = (req, res, next) => {
  const validateId = (id) => {
    const schema = Joi.object({
      id: Joi.string()
    });
    return schema.validate(id)
  };

  const validateIdResult = validateId(req.params);
  if (validateIdResult.error) {
    throw new BadRequestError(validateIdResult.error.details);
  };

  next();
};