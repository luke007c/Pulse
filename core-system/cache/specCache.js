const cache = new Map();

function keyify(t) {
  return t.toLowerCase().split(" ")[0];
}

export function getSpec(key) {
  return cache.get(keyify(key));
}

export function setSpec(key, value) {
  cache.set(keyify(key), value);
}