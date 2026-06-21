const cache = new Map();

export function predict(input) {
  const key = input.toLowerCase().split(" ")[0];

  if (cache.has(key)) {
    return cache.get(key);
  }

  return null;
}

export function storePrediction(input, output) {
  const key = input.toLowerCase().split(" ")[0];
  cache.set(key, output);
}