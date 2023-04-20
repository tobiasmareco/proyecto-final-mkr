import { registerRepository } from "./register.repository.js";

export const registerService = async ({ name, email, password }) => {
  const response = await registerRepository({ name, email, password });
  if (response.response == "error") {
    return { error: response };
  }
  return { result: response };
};
