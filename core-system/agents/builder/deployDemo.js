import fs from "fs";
import path from "path";
import { generateUI } from "./uiBlocks.js";
import { generateFiles } from "./fileGenerator.js";

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

export function buildDemo(business) {

  const ui = generateUI(business);
  const files = generateFiles(ui);

  const dir = path.resolve(`saas/public/demos/${slug(business.name)}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(`${dir}/index.html`, files.html);
  fs.writeFileSync(`${dir}/style.css`, files.css);
  fs.writeFileSync(`${dir}/script.js`, files.js);

  return {
    demoUrl: `http://localhost:3001/demos/${slug(business.name)}`
  };
}