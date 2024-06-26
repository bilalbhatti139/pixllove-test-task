import {validationResult}from "express-validator";

export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res
          .status(400)
          .json({ error: "Bad Request", message: errorMessages });
      }
      next();
    },
  ];
};
