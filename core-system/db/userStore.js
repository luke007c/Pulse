import fs from "fs";

const PATH = "./Core System/db/users.json";

export function addUser(user) {
  const data = JSON.parse(fs.readFileSync(PATH, "utf8"));
  data.push(user);
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

export function getUsers() {
  return JSON.parse(fs.readFileSync(PATH, "utf8"));
}