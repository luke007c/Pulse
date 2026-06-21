export function requireAuth(req, res, next) {

  // SIMPLE PLACEHOLDER (upgrade later to JWT + Stripe check)
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== "demo-key") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}