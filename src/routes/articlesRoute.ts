import express from "express";
import User from "../models/User";
import Article from "../models/Article";
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../utils/stripe";

const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  const { data: subscriptions } = await stripe.subscriptions.list(
    {
      customer: user.customerStripeId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  );

  if (!subscriptions.length) return res.json([]);

  //@ts-ignore
  const plan = subscriptions[0].plan.nickname;

  let articles;
  if (plan === "Basic") {
    articles = await Article.find({ access: "Basic" });
  } else if (plan === "Standard") {
    articles = await Article.find({ access: { $in: ["Basic", "Standard"] } });
  } else {
    articles = await Article.find({});
  }
  return res.json(articles);
});

export default router;
