import ddg from "duck-duck-scrape";

export async function searchGyms(query) {

  const results = await ddg.search(`${query} gym fitness studio UK`);

  return results.results.map(r => ({
    title: r.title,
    url: r.url,
    description: r.description
  }));
}