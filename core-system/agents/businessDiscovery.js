export async function businessDiscovery(query) {

  // 🔌 READY FOR REAL APIS:
  // - Google Places API
  // - Yelp Fusion API
  // - SerpAPI

  // fallback structured simulation (safe dev mode)
  const results = [
    {
      name: "City Gym",
      industry: "fitness",
      problems: ["no booking system", "manual sign-ins"],
      website: false
    },
    {
      name: "Dental Care Clinic",
      industry: "healthcare",
      problems: ["phone-only bookings", "slow admin system"],
      website: true
    }
  ];

  return results.filter(b =>
    b.industry.includes(query.toLowerCase()) ||
    b.problems.join(" ").includes(query.toLowerCase())
  );
}