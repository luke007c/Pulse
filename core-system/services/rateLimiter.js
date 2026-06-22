const lastSent = new Map();

export function canSend(email) {
  const now = Date.now();
  const last = lastSent.get(email) || 0;

  const ONE_HOUR = 1000 * 60 * 60;

  if (now - last < ONE_HOUR) {
    return false;
  }

  lastSent.set(email, now);
  return true;
}