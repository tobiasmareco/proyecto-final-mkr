import { createUserService } from './index.js'

export const createUserController = async (req, res) => {
  const { result, error } = await createUserService(req.body)
  if (error) {
    return res.status(error.statusCode).json({ response: error.response, msg: error.msg })
  }
  return res.status(201).json({ response: 'success', msg: 'Usuario creado correctamente, verifique su correo para activar la cuenta.', result })
}

export const getUsersController = async (req, res) => {
  return res.send('from get usercontroller')
}

export const getUserIdController = async (req, res) => {
  return res.send('from get useridcontroller')
}

export const updateUserController = async (req, res) => {
  return res.send('from put usercontroller')
}

export const deleteUserController = async (req, res) => {
  return res.send('from delete usercontroller')
}