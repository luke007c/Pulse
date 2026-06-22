import fs from "fs";

const PATH = "./Core System/data/memory.json";

function init() {
  if (!fs.existsSync(PATH)) {
    fs.writeFileSync(PATH, JSON.stringify({ items: [] }, null, 2));
  }
}

function read() {
  init();
  return JSON.parse(fs.readFileSync(PATH, "utf-8"));
}

function write(data) {
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

export async function storeMemory(input, output) {
  const data = read();

  data.items.push({
    input,
    output,
    time: Date.now()
  });

  write(data);
}