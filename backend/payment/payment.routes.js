import express from "express";

export const paymentRoute = express.Router()

paymentRoute.get('/config', (req, res) => {
    console.log('entry to config')
    return res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
})

