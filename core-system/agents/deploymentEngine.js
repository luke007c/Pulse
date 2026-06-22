import fs from "fs";

export function deploymentEngine(project) {

  if (!project) {
    return { deployed: false, reason: "No project provided" };
  }

  const manifest = {
    name: project.name || "pulse-app",
    type: "fullstack-app",
    stack: "nextjs + express",
    status: "ready-to-run",
    instructions: [
      "cd output/" + (project.name || "pulse-app"),
      "npm install",
      "npm run dev"
    ]
  };

  fs.writeFileSync(
    `./output/${manifest.name}/deploy.json`,
    JSON.stringify(manifest, null, 2)
  );

  return {
    deployed: true,
    manifest
  };
}