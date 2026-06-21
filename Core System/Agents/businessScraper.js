export async function businessScraper(query) {

  // placeholder for real API integration:
  // - Google Places API
  // - Yelp API
  // - SerpAPI

  const mock = [
    {
      name: "Local Gym",
      problem: "No booking system",
      industry: "fitness",
      value: "high"
    },
    {
      name: "Dentist Clinic",
      problem: "Manual appointment bookings",
      industry: "healthcare",
      value: "high"
    }
  ];

  return mock.filter(b =>
    b.industry.includes(query.toLowerCase()) ||
    b.problem.toLowerCase().includes(query.toLowerCase())
  );
}