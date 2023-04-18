import User from "../../Users/users.model.js";

export const registerRepository = async ({ name, email, password }) => {
  try {
    const user = await User.create({ name, email, password })
    console.log('created succesfully',user)
  } catch (error) {
    console.log(error)
  }

}