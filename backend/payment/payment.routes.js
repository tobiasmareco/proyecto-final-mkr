import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../Users/users.model.js";
dotenv.config();
const stripeInstance = Stripe(process.env.API_STRIPE_SECRET);

const paymentRoute = express.Router();
paymentRoute.post("/checkout", async (req, res) => {
  //1. Crear los ids de precios en stripe.
  const premiumPriceId = "price_1N5t7wCvjl4tGcHoN5VzAsVG";
  //2. Generar una session
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ price: premiumPriceId, quantity: 1 }],
      success_url: `${process.env.FRONT_END_URL}/payment/success/${req.user}`,
      cancel_url: `${process.env.FRONT_END_URL}/projects`,
    });
    res.send({ url: session.url });
  } catch (error) {
    console.log(error.message);
  }
});

paymentRoute.get("/premium", async (req, res) => {
  const { user } = req;
  try {
    const userId = await User.findById(user);
    if (userId.premium) {
      return res
        .status(404)
        .json({ msg: "El usuario ya es un usuario premium" });
    }
    userId.premium = true;
    await userId.save();
    return res
      .status(200)
      .json({ msg: "El usuario se ha actualizado a premium." });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: error.message });
  }
});

export default paymentRoute;
