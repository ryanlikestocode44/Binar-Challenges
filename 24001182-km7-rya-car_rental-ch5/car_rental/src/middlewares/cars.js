const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

// Validasi untuk mengambil semua data cars
exports.validateGetAllCars = (req, res, next) => {
  // Zod validation
  const validateQuery = (queries) => {
    const schema = z.object({
      plate: z.string().optional().nullable(),
      available: z.string().optional().nullable(),
      availableAt: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        })
        .optional()
        .nullable(),
    });

    return schema.safeParse(queries);
  };

  const validateQueryResult = validateQuery(req.query);
  if (!validateQueryResult.success) {
    throw new BadRequestError(validateQueryResult.error.errors);
  }

  if (validateQueryResult.data.available) {
    req.query.available =
      validateQueryResult.data.available == "true" ? true : false;
  }

  if (validateQueryResult.data.availableAt) {
    req.query.availableAt = new Date(validateQueryResult.data.availableAt);
  }

  next();
};

// Validasi untuk mengambil data car dari id
exports.validateGetCarById = (req, res, next) => {
  // Zod validation
  const validateId = (id) => {
    const schema = z.object({
      id: z.string(),
    });
    return schema.safeParse(id);
  };

  const validateIdResult = validateId(req.params);

  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  }

  next();
};

// Validasi untuk menambah data car baru
exports.validateAddCar = (req, res, next) => {
  // Validation for req.body
  const validateCar = (car) => {
    const schema = z.object({
      plate: z.string(),
      modelId: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => !isNaN(Number(val)), {
          message: "Invalid modelId",
        }),
      typeId: z
        .string()
        .transform((val) => val.trim())
        .refine((val) => !isNaN(Number(val)), {
          message: "Invalid typeId",
        }),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      available: z.boolean(),
      description: z.string(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Parse and sanitize data
  if (req.body.available) {
    req.body.available = req.body.available === "true";
  }

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options)
      ? req.body.options
      : [req.body.options];
  }

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs)
      ? req.body.specs
      : [req.body.specs];
  }

  // Validate req.body
  const validateCarResult = validateCar(req.body);
  if (!validateCarResult.success) {
    throw new BadRequestError(validateCarResult.error.errors);
  }

  // Validate req.files
  const validateFileBody = (file) => {
    const schema = z
      .object({
        image: z
          .object({
            name: z.string(),
            data: z.any(),
          })
          .optional(),
      })
      .optional();

    return schema.safeParse(file);
  };

  const resultValidateFiles = validateFileBody(req.files);
  if (!resultValidateFiles.success) {
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

// Validasi untuk merubah data car
exports.validateUpdateCar = (req, res, next) => {
  // Validasi id
  const validateId = (id) => {
    const schema = z.object({
      id: z.string(),
    });
    return schema.safeParse(id);
  };

  // Dapatkan hasil validasi id
  const validateIdResult = validateId(req.params);
  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  }

  // Validasi req.body
  const validateCar = (car) => {
    const schema = z.object({
      plate: z.string(),
      modelId: z.string(),
      typeId: z.string(),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
      }),
      available: z.boolean(),
      description: z.string(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Parsing data
  if (req.body.available) {
    req.body.available = req.body.available == "true" ? true : false;
  }

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options)
      ? req.body.options
      : [req.body.options];
  }

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs)
      ? req.body.specs
      : [req.body.specs];
  }

  // Validasi data file
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = z
      .object({
        image: z
          .object({
            name: z.string(),
            data: z.any(),
          })
          .optional(),
      })
      .optional();

    return schema.safeParse(file);
  };

  // Dapatkan hasil validasi req.body
  const validateCarResult = validateCar(req.body);
  if (!validateCarResult.success) {
    throw new BadRequestError(validateCarResult.error.errors);
  }

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

// Validasi untuk menghapus data car
exports.validateDeleteCarById = (req, res, next) => {
  const validateId = (id) => {
    const schema = z.object({
      id: z.string(),
    });
    return schema.safeParse(id);
  };

  const validateIdResult = validateId(req.params);
  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  }

  next();
};
