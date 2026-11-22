/** Prefix a public file path with the deploy base path (GitHub Pages serves the site from /ga-design-studio). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
