export function planner(message) {
  const plan = {
    tasks: [],
    mode: "single"
  };

  const lower = message.toLowerCase();

  if (lower.includes("analyze") || lower.includes("explain")) {
    plan.tasks.push("nexus");
  }

  if (lower.includes("task") || lower.includes("run")) {
    plan.tasks.push("grid");
  }

  if (lower.includes("save") || lower.includes("remember")) {
    plan.tasks.push("vault");
  }

  if (plan.tasks.length === 0) {
    plan.tasks.push("nexus");
  }

  if (plan.tasks.length > 1) {
    plan.mode = "parallel";
  }

  return {
    type: "plan",
    data: plan
  };
}