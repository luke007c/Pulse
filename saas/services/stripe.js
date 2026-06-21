import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "test_key");

export async function createCheckout() {
  return {
    url: "https://example.com/checkout"
  };
}