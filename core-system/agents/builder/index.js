export async function builder(leads = []) {

  const safeLeads = Array.isArray(leads) && leads.length
    ? leads
    : [{
        name: "Demo Gym",
        website: "https://example.com"
      }];

  function slug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }

  function siteHTML(lead) {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>${lead.name}</title>
</head>
<body style="font-family:Arial;background:#111;color:white;padding:40px">
  <h1>${lead.name}</h1>
  <p>Modern website upgrade opportunity</p>

  <h2>Why upgrade?</h2>
  <ul>
    <li>More customers</li>
    <li>Better trust</li>
    <li>Mobile friendly design</li>
  </ul>

  <a href="#" style="background:#38bdf8;padding:10px 15px;color:black;text-decoration:none;">
    Get Website
  </a>
</body>
</html>`;
  }

  const sites = safeLeads.map(l => ({
    name: l.name,
    slug: slug(l.name),
    demoUrl: `http://localhost:3001/demo/${slug(l.name)}`,
    html: siteHTML(l)
  }));

  return { sites };
}