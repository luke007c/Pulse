import { fastModel } from "./fastModel.js";
import { smartModel } from "./smartModel.js";

export async function route(input) {

  const complex =
    input.length > 60 ||
    input.includes("?") ||
    input.includes("why") ||
    input.includes("how");

  return complex ? smartModel(input) : fastModel(input);
}