import express from 'express'
import { createUserController, deleteUserController, getUserIdController, getUsersController, updateUserController } from '../Users/index.js'
const usersRoutes = express.Router()

usersRoutes.get('/', getUsersController)
usersRoutes.get('/:id', getUserIdController)
usersRoutes.post('/', createUserController)
usersRoutes.put('/:id', updateUserController)
usersRoutes.delete('/:id', deleteUserController)

export default usersRoutes