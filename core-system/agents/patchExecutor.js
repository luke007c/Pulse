import fs from "fs";

export function applyPatch(patch) {

  const filePath = `./Core System/${patch.target}`;

  const file = fs.readFileSync(filePath, "utf-8");

  let updated = file;

  if (patch.action === "add") {
    updated += `\n${patch.code}`;
  }

  if (patch.action === "modify") {
    // safe placeholder marker system
    updated = file.replace(
      "// AUTO_PATCH_POINT",
      `// PATCHED:\n${patch.note}\n// AUTO_PATCH_POINT`
    );
  }

  fs.writeFileSync(filePath, updated);

  return {
    status: "patched",
    file: patch.target
  };
}