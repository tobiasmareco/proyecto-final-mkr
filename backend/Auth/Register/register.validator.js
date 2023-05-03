import { check, validationResult } from "express-validator";

export const validateRegister = [
  check("name")
    .exists()
    .withMessage("Complete los campos obligatorios.")
    .isLength({ min: 4 })
    .withMessage("El campo nombre debe tener al menos 4 caracteres."),
  check("email")
    .exists()
    .withMessage("Complete los campos obligatorios.")
    .isEmail()
    .withMessage("El email no es valido.")
    .toLowerCase(),
  check("password")
    .exists()
    .withMessage("Complete los campos obligatorios.")
    .isLength({ min: 6 })
    .withMessage("La contrasena debe tener al menos 6 caracteres."),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      return res
        .status(403)
        .json({ response: "error", errors: error.array()[0] });
    }
  },
];
