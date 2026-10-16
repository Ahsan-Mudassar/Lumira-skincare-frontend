export function formatDate(iso, { time = false } = {}) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    ...(time && { timeStyle: "short" }),
    timeZone: "Asia/Karachi",
  }).format(date);
}
