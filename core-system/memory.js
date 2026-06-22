import fs from "fs";
import { embed } from "./embeddings.js";

const PATH = "./Core System/Memory/store.json";

// =========================
// SAFE INIT
// =========================
function init() {
  if (!fs.existsSync(PATH)) {
    fs.writeFileSync(
      PATH,
      JSON.stringify({ projects: [] }, null, 2)
    );
  }
}

// =========================
// READ MEMORY SAFELY
// =========================
export function readMemory() {
  try {
    init();
    return JSON.parse(fs.readFileSync(PATH, "utf-8"));
  } catch (err) {
    return { projects: [] };
  }
}

// =========================
// WRITE MEMORY
// =========================
function writeMemory(data) {
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

// =========================
// SAVE PROJECT (ENHANCED)
// =========================
export async function saveProject(name, data) {

  const memory = readMemory();

  const text = `${name} ${JSON.stringify(data)}`;
  const vector = await embed(text);

  const project = {
    id: Date.now() + Math.random(),
    name,
    created: new Date().toISOString(),
    data,

    // 🧠 semantic layer
    vector,

    // 📊 metadata
    importance: 1,
    accessCount: 0,
    lastAccessed: Date.now()
  };

  memory.projects.push(project);

  // 🧹 prevent unlimited growth
  if (memory.projects.length > 500) {
    memory.projects = memory.projects.slice(-500);
  }

  writeMemory(memory);

  return project;
}

// =========================
// GET ALL PROJECTS
// =========================
export function getProjects() {
  return readMemory().projects;
}

// =========================
// TOUCH PROJECT (USAGE BOOST)
// =========================
export function touchProject(id) {
  const memory = readMemory();

  const project = memory.projects.find(p => p.id === id);

  if (project) {
    project.accessCount += 1;
    project.lastAccessed = Date.now();
    project.importance = Math.min(5, project.importance + 0.1);

    writeMemory(memory);
  }

  return project;
}

// =========================
// SEMANTIC SEARCH (UPGRADED)
// =========================
export async function findRelevantProjects(query, limit = 5) {

  const memory = readMemory();

  const queryVector = await embed(query);

  const scored = memory.projects.map(p => {

    const vec = p.vector || [];

    let sim = 0;
    let dot = 0, magA = 0, magB = 0;

    if (vec.length === queryVector.length) {
      for (let i = 0; i < vec.length; i++) {
        dot += vec[i] * queryVector[i];
        magA += vec[i] * vec[i];
        magB += queryVector[i] * queryVector[i];
      }

      sim = magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
    }

    // =========================
    // SCORING BOOST SYSTEM
    // =========================

    const recencyBoost =
      1 / (1 + (Date.now() - new Date(p.created)) / 86400000);

    const usageBoost = 1 + Math.log(1 + (p.accessCount || 0));

    const importanceBoost = 1 + (p.importance || 1) * 0.3;

    const score =
      sim * recencyBoost * usageBoost * importanceBoost;

    return { ...p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}