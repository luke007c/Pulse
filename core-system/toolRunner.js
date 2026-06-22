import { tools } from "../Tools/tools.js";

export function runTool(name, args = {}) {
  const tool = tools[name];

  if (!tool) {
    return {
      error: `Tool not found: ${name}`
    };
  }

  try {
    return tool(args);
  } catch (err) {
    return {
      error: err.message
    };
  }
}