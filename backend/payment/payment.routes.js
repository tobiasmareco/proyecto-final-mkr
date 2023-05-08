import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../Users/users.model.js";
dotenv.config();
const stripeInstance = Stripe(process.env.API_STRIPE_SECRET);

const paymentRoute = express.Router();
paymentRoute.post("/checkout", async (req, res) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${process.env.FRONT_END_URL}/payment/success`,
      cancel_url: `${process.env.FRONT_END_URL}/payment/canceled`,
      line_items: [{ price: "price_1N4SmbI3JMaqaSPWLSod3myk", quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      client_reference_id: req.user,
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
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
