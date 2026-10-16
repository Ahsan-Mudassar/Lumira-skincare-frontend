export function cleanParams(params = {}) {
  const cleaned = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    cleaned[key] = Array.isArray(value) ? value.join(",") : value;
  }
  return cleaned;
}