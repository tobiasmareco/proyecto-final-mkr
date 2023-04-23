import {
  check,
  validationResult
} from 'express-validator';

export const validatorCreateTask = [
  check('title').exists().withMessage('El campo titulo es obligatorio.').trim().isLength({
    min: 3
  }).withMessage('El campo titulo debe tener almenos 3 caracteres.'),
  check('projectId').exists().withMessage('Se require un id de Proyecto'),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      return next()
    } catch (error) {
      return res.status(400).json({
        response: 'error',
        errors: error.array()
      })
    }
  }
]

export const validatorUpdateTask = [
  check('title').exists().withMessage('El campo titulo es obligatorio.').trim().isLength({
    min: 4
  }).withMessage('El campo titulo debe tener al menos 4 caracteres.'),
  check('description').exists().withMessage('El campo descripcion es obligatorio.').trim(),
  (req, res, next) => {
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      return res.status(400).json({
        response: 'error',
        errors: error.array()
      })
    }
  }
]
