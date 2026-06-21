import { orchestrator } from "../orchestrator.js";
import { vault } from "./vault.js";
import { leadGenerator } from "./leadGenerator.js";
import { outreachEngine } from "./outreachEngine.js";
import { log } from "../logger.js";

export async function backgroundProcess(message, userId = "default") {

  try {

    log("Background processing started", "pulse");

    const system = await orchestrator(message);

    const leads = system?.discovered
      ? leadGenerator(system.discovered)
      : { total: 0, leads: [] };

    const outreach = leads.total > 0
      ? outreachEngine(leads)
      : { total: 0, messages: [] };

    await vault("store", {
      user: userId,
      system,
      leads,
      outreach
    });

    log("Background processing finished", "pulse");

  } catch (err) {
    log(`Background error: ${err.message}`, "error");
  }
}