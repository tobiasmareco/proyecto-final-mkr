import { check, validationResult } from "express-validator";

export const validateReset = [
  check("password")
    .exists()
    .withMessage("La contrasena es obligatoria.")
    .isLength({ min: 6 })
    .withMessage("La contrasena debe tener al menos 6 caracteres."),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      return res.status(404).json(error.array());
    }
  },
];
