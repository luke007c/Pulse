import express from "express";
import { createCheckout } from "../services/stripe.js";

const router = express.Router();

// =========================
// START SUBSCRIPTION
// =========================
router.post("/checkout", async (req, res) => {
  try {
    const session = await createCheckout();
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;