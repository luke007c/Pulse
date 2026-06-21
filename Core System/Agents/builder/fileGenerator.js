export function generateFiles(builderData) {
  return {
    html: generateHTML(builderData),
    css: generateCSS(builderData),
    js: generateJS(builderData)
  };
}

function generateHTML(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>${data.businessName}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>${data.homepage?.headline || ""}</h1>
  <p>${data.homepage?.subheadline || ""}</p>
  <button>${data.homepage?.cta || "Contact Us"}</button>
</body>
</html>
`;
}

function generateCSS(data) {
  return `
body {
  font-family: Arial;
  margin: 0;
  padding: 40px;
}
h1 {
  font-size: 40px;
}
button {
  padding: 12px 20px;
}
`;
}

function generateJS() {
  return `
console.log("Pulse site loaded");
`;
}