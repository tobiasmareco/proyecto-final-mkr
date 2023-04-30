import { check, validationResult } from "express-validator";

export const validatorCreateProject = [
  check('title').exists().withMessage('El campo titulo es obligatorio.').trim().isLength({ min: 4 }).withMessage('El campo titulo debe tener al menos 4 caracteres.'),
  check('description').exists().withMessage('El campo descripcion es obligatorio.').trim(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      // return res.status(400).json({ response: 'error', errors: error.array() })
      return res.status(400).json({response:'error',error:error.array()[0]})
    }
  }
]

export const validatorUpdateProject = [
  check('title').exists().withMessage('El campo titulo es obligatorio.').trim().isLength({ min: 4 }).withMessage('El campo titulo debe tener al menos 4 caracteres.'),
  check('description').exists().withMessage('El campo descripcion es obligatorio.').trim(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      // return res.status(400).json({ response: 'error', errors: error.array() })
      return res.status(400).json({response:'error',error:error.array()[0]})
    }
  }
]