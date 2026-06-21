export function generateUI(builderData) {

  return {
    hero: createHero(builderData),
    sections: createSections(builderData),
    components: createComponents(builderData)
  };
}

// ----------------------
// HERO SECTION
// ----------------------
function createHero(data) {
  return {
    title: data.homepage?.headline || "Welcome",
    subtitle: data.homepage?.subheadline || "We build modern solutions",
    cta: data.homepage?.cta || "Get Started"
  };
}

// ----------------------
// SECTIONS
// ----------------------
function createSections(data) {
  return [
    {
      type: "about",
      content: data.businessDescription || "About section coming soon"
    },
    {
      type: "services",
      content: data.features || []
    }
  ];
}

// ----------------------
// UI COMPONENTS
// ----------------------
function createComponents(data) {
  return {
    navbar: true,
    footer: true,
    contactForm: true,
    animations: "basic"
  };
}