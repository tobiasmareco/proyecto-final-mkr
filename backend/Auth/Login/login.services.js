import { loginRepository } from "./login.repository.js";
export const loginService = async ({ email, password }) => {
  const response = await loginRepository(email, password)
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response }
}