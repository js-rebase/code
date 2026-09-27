let configPromise;

async function loadConfig() {
  if (!configPromise) {
    configPromise = fetch("/rebase.config.json")
      .then(async response => {
        if (!response.ok) {
          return {};
        }

        return await response.json();
      })
      .catch(() => {
        return {};
      });
  }

  return configPromise;
}

export default async function getConfig(key, fallback = undefined) {
  const config = await loadConfig();

  const value = key
    .split(".")
    .reduce(
      (current, part) => current?.[part],
      config
    );

  return value ?? fallback;
}
