export async function sales(leads = [], builderData = {}) {

  const sites = builderData?.sites || [];

  if (!sites.length) {
    return {
      sent: false,
      results: []
    };
  }

  const results = sites.map(site => ({
    lead: site.name,
    email: `${site.slug}@business.com`,
    sent: true,
    demoLink: site.demoUrl
  }));

  return {
    sent: true,
    results
  };
}