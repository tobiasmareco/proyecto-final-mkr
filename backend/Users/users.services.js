import { createUserRepository } from './index.js'

export const createUserService = async (user) => {
  const response = await createUserRepository({ ...user })
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response.result }
}

export const getUsersService = async () => {
}

export const getUserIdService = async () => {
}

export const updateUserService = async () => {
}

export const deleteUserService = async () => {
}