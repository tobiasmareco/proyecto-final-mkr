import { bcryptFunction } from '../helpers/bcrypt.js'
import { Token } from '../helpers/generateToken.js'
import User from './users.model.js'

export const createUserRepository = async ({ name, email, password, premium, admin }) => {
  try {
    const user = await User.findOne({ email })
    if (user) {
      return { response: 'error', statusCode: 404, msg: new Error('El email ya se encuentra registrado.').message }
    }
    const newUser = {
      name,
      email,
      password: await bcryptFunction.GENERATE(password),
      token: Token.GENERATE(),
      premium,
      admin
    }
    const createUser = await User.create(newUser)
    return { response: 'success', result: createUser }
  } catch (error) {
    return { response: 'error', error, statusCode: 500 }
  }
}

export const getUsersRepository = async( ) =>{

}

export const getUserIdRepository = async ()=>{

}

export const updateUserRepository = async()=>{

}

export const deleteUserRepository = async()=>{
  
}