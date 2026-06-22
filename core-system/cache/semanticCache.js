const cache = new Map();

function norm(t) {
  return t.toLowerCase().trim();
}

export function getSemantic(key) {
  return cache.get(norm(key));
}

export function setSemantic(key, value) {
  cache.set(norm(key), value);
}