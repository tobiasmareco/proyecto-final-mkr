import { registerRepository } from "./register.repository.js"

export const registerService = async ({ name, email, password }) => {
  await registerRepository(name, email, password)
} 