import fetch from "node-fetch";

// This is your "swap layer"
// You can plug in ANY API here later

export async function fetchBusinesses(query) {

  // ----------------------------
  // OPTION 1: Placeholder (dev mode)
  // ----------------------------
  const fallback = [
    {
      name: "City Gym",
      industry: "fitness",
      problems: ["no booking system", "manual sign-ins"]
    },
    {
      name: "Barber Shop",
      industry: "retail",
      problems: ["phone-only bookings", "no website"]
    }
  ];

  return fallback;

  // ----------------------------
  // OPTION 2: REAL API (future)
  // ----------------------------
  /*
  const res = await fetch(`https://api.example.com/businesses?q=${query}`);
  const data = await res.json();
  return data.results;
  */
}