export function builderAgent(task) {

  const t = task.toLowerCase();

  const base = {
    frontend: [],
    backend: [],
    database: [],
    apis: [],
    agents: []
  };

  // APP TYPE DETECTION
  if (t.includes("booking")) {
    base.frontend = [
      "calendar UI",
      "booking form",
      "admin dashboard"
    ];

    base.backend = [
      "booking API",
      "user management",
      "availability engine"
    ];

    base.database = [
      "users",
      "appointments",
      "services"
    ];
  }

  if (t.includes("ecommerce") || t.includes("shop")) {
    base.frontend = [
      "product listing",
      "cart",
      "checkout"
    ];

    base.backend = [
      "payment system",
      "order processing"
    ];

    base.database = [
      "products",
      "orders",
      "users"
    ];
  }

  if (t.includes("fitness") || t.includes("gym")) {
    base.frontend = [
      "member dashboard",
      "class booking"
    ];

    base.backend = [
      "membership system",
      "trainer scheduling"
    ];

    base.database = [
      "members",
      "classes",
      "payments"
    ];
  }

  return base;
}