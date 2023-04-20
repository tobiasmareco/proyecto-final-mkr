import jwt from "jsonwebtoken";
const options = { expiresIn: "24h", algorithm: "HS256" };
export const Token = {
  GENERATE: () => {
    return Date.now().toString(32) + Math.random(1).toString(32).substring(2);
  },
};

export const JWT = {
  GENERATE: (payload, secret) => {
    return jwt.sign(
      {
        payload,
      },
      secret,
      options
    );
  },
  VERIFY: (token, secret) => {
    const data = jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return undefined;
      }
      return decoded;
    });
    return { result: data };
  },
};
