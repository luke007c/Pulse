import "dotenv/config";
import express from "express";
import cors from "cors";

// --------------------
// CORE NEXUS
// --------------------
import { nexus } from "../Core System/agents/nexus.js";

// --------------------
// AGENTS
// --------------------
import { researcher } from "../Core System/agents/researcher/index.js";
import { builder } from "../Core System/agents/builder/index.js";
import { sales } from "../Core System/agents/sales/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// --------------------
// HEALTH CHECK
// --------------------
app.get("/", (req, res) => {
  res.json({ status: "Pulse SaaS running" });
});

// --------------------
// MAIN PIPELINE ROUTE
// --------------------
app.post("/api/run", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ error: "Missing input" });
    }

    let streamText = "";

    const result = await nexus(
      input,
      (token) => {
        streamText += token;
      },
      {
        researcher,
        builder,
        sales
      }
    );

    res.json({
      success: true,
      streamed: streamText,
      result
    });

  } catch (err) {
    console.error("PIPELINE ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 SaaS running on http://localhost:${PORT}`);
});