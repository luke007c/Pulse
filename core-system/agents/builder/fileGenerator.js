export function generateFiles(ui) {

  return {
    html: `
<!DOCTYPE html>
<html>
<head>
  <title>${ui.hero.title}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <h1>${ui.hero.title}</h1>
  <p>${ui.hero.subtitle}</p>
  <button>${ui.hero.cta}</button>
</header>

<section>
  <h2>Problem</h2>
  <p>${ui.sections[0].problem}</p>
  <h2>Solution</h2>
  <p>${ui.sections[0].solution}</p>
</section>

<section>
  <h2>Features</h2>
  <ul>
    ${ui.sections[1].items.map(i => `<li>${i}</li>`).join("")}
  </ul>
</section>

<footer>
  <button>${ui.sections[2].text}</button>
</footer>

</body>
</html>
`,

    css: `
body { font-family: Arial; padding: 40px; }
header { background: #111; color: white; padding: 40px; }
button { padding: 12px 18px; background: blue; color: white; }
`,

    js: `console.log("Pulse demo loaded");`
  };
}