import { check, validationResult } from "express-validator";
export const validateForgot = [
  check("email")
    .exists()
    .withMessage("El email es obligatorio.")
    .isEmail()
    .withMessage("El email no es valido.")
    .toLowerCase(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      return res.status(403).json(error.array());
    }
  },
];
