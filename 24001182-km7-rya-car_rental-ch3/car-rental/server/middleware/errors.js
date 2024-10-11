import { NotFoundError } from "../utils/request.js";

// This function is to handle API errors
export const errorHandler = (err, req, res, next) => {
  console.log(err);

  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
      message = "Internal Server Error";
  }

  res.status(status).json({
      success: false,
      data: null,
      message,
      errors,
  });
};

export const notFoundURLError = (req, res, next) => {
  throw new NotFoundError('URL not found');
};