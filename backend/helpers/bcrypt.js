import bcrypt from "bcryptjs";

export const bcryptFunction = {
  GENERATE: (password) => {
    return bcrypt.hash(password, 10);
  },
  COMPARE: (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
  },
};
