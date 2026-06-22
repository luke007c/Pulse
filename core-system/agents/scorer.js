import { scoreLead } from "../utils/leadScore.js";

export function scorer(businesses = []) {

  return businesses
    .map(b => ({
      ...b,
      score: scoreLead(b)
    }))
    .sort((a, b) => b.score - a.score);
}