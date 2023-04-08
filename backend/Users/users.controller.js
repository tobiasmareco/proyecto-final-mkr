export const getUsersController = async (req, res) => {
  return res.send('from get usercontroller')
}
export const getUserIdController = async (req, res) =>{ 
  return res.send('from get useridcontroller')

}
export const createUserController = async (req, res) =>{
  return res.send('from post usercontroller')

}
export const updateUserController = async (req, res) =>{
  return res.send('from put usercontroller')

}
export const deleteUserController = async (req, res) =>{
  return res.send('from delete usercontroller')
}