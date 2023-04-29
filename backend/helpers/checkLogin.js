import { JWT } from "./generateToken.js";
export const checkLogin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token || !req.headers.authorization.startsWith("Bearer")) {
      return res.status(401).json({ msg: "Token no existe." });
    }
    token = token.split(" ")[1];
    const { result } = JWT.VERIFY(token, process.env.API_JWT_SECRET);
    if (!result) {
      return res
        .status(404)
        .json({ response: "error", msg: "Token no valido." });
    }
    req.user = result.payload;
    next();
  } catch (error) {
    console.log(error, "from checklogin");
  }
};
