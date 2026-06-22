import express from "express";
import cors from "cors";
import { nexus } from "../core-system/agents/nexus.js";

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------
app.get("/", (req, res) => {
  res.json({ status: "Pulse SaaS running" });
});

// -------------------------
app.post("/api/run", async (req, res) => {

  const { input } = req.body || {};

  if (!input) {
    return res.status(400).json({
      success: false,
      error: "Missing input"
    });
  }

  const result = await nexus(input, {
    researcher: async () => ({ businesses: [] }),
    builder: async (leads) => ({
      sites: leads.map(l => ({
        name: l.name,
        url: `https://${l.name.toLowerCase().replace(/ /g, "-")}.demo`
      }))
    }),
    sales: async () => ({ sent: true })
  });

  return res.json({
    success: true,
    result
  });
});

// -------------------------
app.listen(3001, () => {
  console.log("🚀 Pulse running on http://localhost:3001");
});