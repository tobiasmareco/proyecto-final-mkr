import { check, validationResult } from 'express-validator'

export const validateCreateUser = [
  check('name').exists().withMessage('El campo nombre es obligatorio.'),
  check('email').exists().withMessage('El campo email es obligatorio').isEmail().withMessage('El email no es valido.'),
  check('password').exists().withMessage('El campo password es obligatorio').isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres.'),
  (req,res,next)=>{
    try {
      validationResult(req).throw()
      next()
    } catch (error) {
      return res.status(400).json({response:'error',errors:error.array()})
    }
  }
]