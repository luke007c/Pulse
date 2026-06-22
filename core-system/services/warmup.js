export function delaySend(ms) {
  return new Promise(res => setTimeout(res, ms));
}