export function fullBuilder(opportunity) {

  if (!opportunity?.match) return null;

  const base = {
    stack: "MERN",
    architecture: "full stack web + responsive website",

    website: {
      pages: ["home", "about", "services", "contact"],
      features: ["seo", "fast load", "mobile responsive"]
    },

    app: {
      frontend: [],
      backend: [],
      database: []
    }
  };

  const features = opportunity.recommendedBuild.features;

  if (features.includes("booking system")) {
    base.app.frontend.push("calendar UI", "booking form");
    base.app.backend.push("booking API");
    base.app.database.push("appointments");
  }

  if (features.includes("admin dashboard")) {
    base.app.frontend.push("analytics dashboard");
    base.app.backend.push("admin API");
  }

  return base;
}