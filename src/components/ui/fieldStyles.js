export const fieldBase =
  "w-full rounded-lg border px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const fieldTone = {
  white: "border-transparent bg-white shadow-soft",
  surface: "border-transparent bg-surface",
};

export const fieldInvalid = "border-danger";

export function describedBy(id, error, hint) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}
