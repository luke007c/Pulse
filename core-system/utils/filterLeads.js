export function filterBusinesses(data) {
  if (!data?.businesses) return [];

  const banned = ["puregym", "david lloyd", "the gym group"];

  return data.businesses.filter(b =>
    !banned.some(x =>
      (b.name || "").toLowerCase().includes(x)
    )
  );
}