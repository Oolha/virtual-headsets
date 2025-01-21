export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/catalog", label: "Catalog" },
  { path: "/contact", label: "Contact" },
  { path: "/", label: "Features" },
] as const;

export type NavLink = (typeof navLinks)[number];
