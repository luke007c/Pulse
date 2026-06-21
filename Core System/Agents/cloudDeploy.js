import fs from "fs";

export async function cloudDeploy(project) {

  if (!project) return { deployed: false };

  const config = {
    provider: "vercel-ready",
    framework: "nextjs",
    buildCommand: "npm run build",
    output: ".next",
    envRequired: true
  };

  fs.writeFileSync(
    `./output/${project.name}/deployment.json`,
    JSON.stringify(config, null, 2)
  );

  return {
    deployed: true,
    url: `https://deploy.pulse/${project.name}`,
    instructions: [
      "Connect repo to Vercel",
      "Import project",
      "Auto deploy enabled"
    ]
  };
}