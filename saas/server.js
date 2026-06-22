import express from "express";
import dotenv from "dotenv";

// -------------------------
// AGENTS (IMPORTANT: MUST EXIST)
// -------------------------
import { nexus } from "../core-system/agents/nexus.js";
import { researcher } from "../core-system/agents/researcher/index.js";
import { builder } from "../core-system/agents/builder/index.js";
import { sales } from "../core-system/agents/sales/index.js";

// -------------------------
dotenv.config();

const app = express();
app.use(express.json());

// -------------------------
// HEALTH CHECK
// -------------------------
app.get("/", (req, res) => {
  res.json({
    status: "Pulse running",
    time: new Date().toISOString()
  });
});

// -------------------------
// MAIN PIPELINE ROUTE
// -------------------------
app.post("/api/run", async (req, res) => {
  try {

    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        success: false,
        error: "Missing input"
      });
    }

    // -------------------------
    // RUN NEXUS PIPELINE
    // -------------------------
    const result = await nexus(input, () => {}, {
      researcher,
      builder,
      sales
    });

    // -------------------------
    // 🔥 DEBUG OUTPUT (CRITICAL)
    // -------------------------
    console.log("\n=== PIPELINE RESULT START ===");
    console.dir(result, { depth: null });
    console.log("=== PIPELINE RESULT END ===\n");

    // -------------------------
    // RETURN RESPONSE SAFELY
    // -------------------------
    return res.json({
      success: true,
      result: result || {}
    });

  } catch (err) {

    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// -------------------------
// START SERVER
// -------------------------
app.listen(3001, () => {
  console.log("🚀 Pulse running on http://localhost:3001");
});