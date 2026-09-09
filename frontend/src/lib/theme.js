import { useEffect, useState } from "react";

const KEY = "theme";

export const readTheme = () => {
  try {
    return localStorage.getItem(KEY) || "system";
  } catch {
    return "system";
  }
};

const apply = (theme) => {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
};

// Cycles light -> dark -> system, mirroring the value onto <html data-theme>.
export const useTheme = () => {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    apply(theme);
    try {
      if (theme === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable — the in-memory value still applies */
    }
  }, [theme]);

  const cycle = () =>
    setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "system" : "light"));

  return { theme, setTheme, cycle };
};
