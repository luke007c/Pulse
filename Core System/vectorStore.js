const store = [];

function embed(text) {
  const v = new Array(128).fill(0);
  const words = text.toLowerCase().split(/\s+/);

  for (const w of words) {
    v[w.charCodeAt(0) % 128]++;
  }

  return v;
}

function cosine(a, b) {
  let dot = 0, ma = 0, mb = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    ma += a[i] * a[i];
    mb += b[i] * b[i];
  }

  return dot / (Math.sqrt(ma) * Math.sqrt(mb) + 1e-9);
}

export function getVector(input, threshold = 0.9) {
  const v = embed(input);

  for (const item of store) {
    if (cosine(v, item.v) > threshold) {
      return item.value;
    }
  }

  return null;
}

export function setVector(input, value) {
  store.push({ v: embed(input), value });
}