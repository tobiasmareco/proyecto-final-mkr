import { loginService } from "./login.services.js"
export const loginController = async (req, res) => {
  const {result,error}= await loginService(req.body)
  if(error){
    console.log(error)
  }
  
}