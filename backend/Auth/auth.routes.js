import express from 'express'
const authRoutes = express.Router()

authRoutes.get('/',(req,res)=> res.send('Welcome to auth route'))

export default authRoutes