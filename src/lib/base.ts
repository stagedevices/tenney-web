export const base = import.meta.env.BASE_URL;

export const href = (path: string) => {
  const normalized = path.replace(/^\//, "");
  return new URL(normalized, window.location.origin + base).pathname;
};
