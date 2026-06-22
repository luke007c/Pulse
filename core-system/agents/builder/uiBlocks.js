export function generateUI(business) {
  return {
    theme: "modern-fitness",

    hero: {
      title: `Welcome to ${business.name}`,
      subtitle: `Better digital experience for ${business.location}`,
      cta: "Get Started"
    },

    sections: [
      {
        type: "problem-solution",
        problem: "Outdated website and manual booking systems",
        solution: "Modern booking, memberships, and mobile experience"
      },
      {
        type: "features",
        items: [
          "Online booking",
          "Member management",
          "Mobile responsive design",
          "Automated payments"
        ]
      },
      {
        type: "cta",
        text: "Request Free Demo Upgrade"
      }
    ]
  };
}