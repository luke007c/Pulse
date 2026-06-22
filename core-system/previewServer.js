import express from "express";
import path from "path";

export function startPreviewServer(sitePath, port = 3000) {
  const app = express();

  app.use(express.static(sitePath));

  app.listen(port, () => {
    console.log("\n🌐 PREVIEW SERVER LIVE");
    console.log(`👉 http://localhost:${port}\n`);
  });

  return `http://localhost:${port}`;
}