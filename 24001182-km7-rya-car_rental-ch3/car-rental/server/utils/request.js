// Standarisasi response error
// Bad Request Error from Joi validation
export class BadRequestError extends Error {
  constructor(errors) {
    super("Validation Failed");
    this.errors = errors;
    this.status = 400;
  }
};

// Not found error from Joi validation
export class NotFoundError extends Error {
  constructor(message) {
    if (!message) {
      super("Data not found!");
    } else {
      super(message);
    }
    this.status = 404;
  }
};

export class InternalServerError extends Error {
  constructor(errors) {
    super("Internal Server Error");
    this.errors = errors;
    this.status = 500;
  }
};