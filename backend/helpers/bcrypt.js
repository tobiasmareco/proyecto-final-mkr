import bcrypt from 'bcryptjs'

export const bcryptFunction = {
  GENERATE: (password) => {
    return bcrypt.hash(password, 10)
  }
}