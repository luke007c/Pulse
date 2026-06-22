export function appGenerator(buildPlan) {

  const plan = {
    stack: "node + react",
    type: "fullstack web app",

    frontend: [],
    backend: [],
    database: [],
    features: []
  };

  const text = JSON.stringify(buildPlan).toLowerCase();

  // booking system
  if (text.includes("booking")) {
    plan.frontend.push("calendar UI", "booking form", "admin dashboard");
    plan.backend.push("booking API", "availability engine");
    plan.database.push("users", "appointments");
    plan.features.push("notifications", "scheduling");
  }

  // dashboard system
  if (text.includes("dashboard")) {
    plan.frontend.push("analytics dashboard");
    plan.backend.push("metrics engine");
  }

  // ecommerce
  if (text.includes("shop") || text.includes("ecommerce")) {
    plan.frontend.push("product listing", "cart", "checkout");
    plan.backend.push("payments", "orders");
    plan.database.push("products", "orders");
  }

  return plan;
}