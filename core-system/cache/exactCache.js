const cache = new Map();

export function getExact(key) {
  return cache.get(key);
}

export function setExact(key, value) {
  cache.set(key, value);
}