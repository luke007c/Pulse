export async function swarm(task) {

  const agents = [
    { role: "planner", goal: "break task into steps" },
    { role: "builder", goal: "design system architecture" },
    { role: "tester", goal: "find issues and edge cases" }
  ];

  const results = [];

  for (const agent of agents) {
    results.push(await runAgent(agent, task));
  }

  return {
    task,
    agents: results
  };
}

async function runAgent(agent, task) {

  if (agent.role === "planner") {
    return {
      role: "planner",
      output: `Step breakdown for: ${task}`
    };
  }

  if (agent.role === "builder") {
    return {
      role: "builder",
      output: `System architecture created for: ${task}`
    };
  }

  if (agent.role === "tester") {
    return {
      role: "tester",
      output: `Edge cases identified for: ${task}`
    };
  }
}