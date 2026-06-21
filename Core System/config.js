export const config = {

  // =========================
  // APP IDENTITY
  // =========================
  appName: "Pulse",
  version: "1.0.0",
  mode: "development",

  // =========================
  // CORE SYSTEM FLAGS
  // =========================
  features: {
    nexus: true,
    grid: true,
    vault: true,
    judge: true,
    cache: true,

    leadGeneration: true,
    outreachEngine: true,

    autonomousMode: true
  },

  // =========================
  // MEMORY SETTINGS
  // =========================
  memory: {
    maxItems: 200,
    compressionThreshold: 80,
    embeddingModel: "xenova",
    semanticSearch: true,
    decayRate: 0.15
  },

  // =========================
  // GRID / EXECUTION SETTINGS
  // =========================
  grid: {
    maxSteps: 20,
    retryOnFail: true,
    maxRetries: 2,
    parallelExecution: false
  },

  // =========================
  // JUDGE SETTINGS
  // =========================
  judge: {
    maxScore: 10,
    autoRejudge: true,
    passThreshold: 6
  },

  // =========================
  // CACHE SETTINGS
  // =========================
  cache: {
    enabled: true,
    ttlMs: 1000 * 60 * 10,
    maxSize: 1000
  },

  // =========================
  // LEAD SYSTEM SETTINGS
  // =========================
  leads: {
    minScore: 2,
    autoRank: true,
    includeOpportunityDetection: true
  },

  // =========================
  // OUTREACH SETTINGS
  // =========================
  outreach: {
    tone: "professional",
    maxMessages: 20,
    autoGenerateEmails: true
  },

  // =========================
  // AI BEHAVIOUR SETTINGS
  // =========================
  ai: {
    temperature: 0.7,
    strictJsonOutput: true,
    maxContextTokens: 6000,
    systemPersona: "autonomous-software-factory"
  }
};