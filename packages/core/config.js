import fs from "node:fs";
import path from "node:path";

let config;

function findConfig(startDir = process.cwd()) {
  let dir = path.resolve(startDir);

  while (true) {
    const file = path.join(dir, "rebase.config.json");

    if (fs.existsSync(file)) {
      return file;
    }

    const parent = path.dirname(dir);

    if (parent === dir) {
      return null;
    }

    dir = parent;
  }
}

function loadConfig() {
  if (config !== undefined) {
    return config;
  }

  const configPath = findConfig();

  if (!configPath) {
    config = {};
    return config;
  }

  config = JSON.parse(
    fs.readFileSync(configPath, "utf8")
  );

  return config;
}

export function getConfig(key, fallback = undefined) {
  const value = key
    .split(".")
    .reduce((current, part) => current?.[part], loadConfig());

  return value ?? fallback;
}
