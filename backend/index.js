import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { conectDatabase } from './config/conectDatabase.js'
const app = express()
conectDatabase()
app.listen(4000, () => {
  console.log('listening on port 4000')
})