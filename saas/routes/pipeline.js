import express from "express";
import { runPipeline } from "../../Core System/pipeline.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// =========================
// RUN AI PIPELINE (PROTECTED)
// =========================
router.post("/run", requireAuth, async (req, res) => {
  try {
    const { input } = req.body;

    const result = await runPipeline(input);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;