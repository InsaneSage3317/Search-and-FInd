/**
 * Utility to format dates in a hydration-safe way.
 * By using a fixed locale and options, we ensure the server and client
 * render the exact same string, avoiding "Text content did not match" errors.
 */

export function formatDate(date: Date | string | number) {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatShortDate(date: Date | string | number) {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
