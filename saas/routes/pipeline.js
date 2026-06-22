import express from "express";
import { pipeline } from "../../core-system/pipeline.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// =========================
// RUN AI PIPELINE (PROTECTED)
// =========================
router.post("/run", requireAuth, async (req, res) => {
  try {

    const input = req.body?.input;

    if (!input) {
      return res.status(400).json({
        success: false,
        error: "Missing input"
      });
    }

    const result = await pipeline(input);

    return res.json({
      success: true,
      result
    });

  } catch (err) {

    console.error("Pipeline Route Error:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;