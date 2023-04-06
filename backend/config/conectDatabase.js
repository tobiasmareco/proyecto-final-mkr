import mongoose from "mongoose";

export const conectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.API_DATABASE, {})
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`databased conected ${url}`)
  } catch (error) {
    console.log(error)
  }
}