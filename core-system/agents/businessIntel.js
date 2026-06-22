export async function businessIntel(query) {

  // This is where real integrations go:
  // - Google Places API
  // - SerpAPI
  // - Yelp Fusion API

  // structured output format (IMPORTANT)
  return [
    {
      name: "Local Gym",
      problems: ["no booking system", "manual signups"],
      urgency: "high",
      revenueOpportunity: "high"
    },
    {
      name: "Barber Shop",
      problems: ["no website", "phone-only bookings"],
      urgency: "medium",
      revenueOpportunity: "high"
    }
  ];
}