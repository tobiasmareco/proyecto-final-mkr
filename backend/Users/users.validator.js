import { check, validationResult } from "express-validator";

export const validateCreateUser = [
  check("name").exists().withMessage("Complete los campos obligatorios."),
  check("email")
    .exists()
    .withMessage("Complete los campos obligatorios.")
    .isEmail()
    .withMessage("El email no es valido."),
  check("password")
    .exists()
    .withMessage("Complete los campos obligatorios.")
    .isLength({ min: 6 })
    .withMessage("El password debe tener al menos 6 caracteres."),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ response: "error", error: error.array()[0] });
    }
  },
];
