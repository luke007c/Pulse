import fs from "fs";

const PATH = "./Core System/db/memory.json";

export function saveMemory(data) {

  const existing = fs.existsSync(PATH)
    ? JSON.parse(fs.readFileSync(PATH, "utf8"))
    : [];

  existing.push({
    ...data,
    timestamp: Date.now()
  });

  fs.writeFileSync(PATH, JSON.stringify(existing, null, 2));
}