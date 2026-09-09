import { useTheme } from "../lib/theme";

const NEXT = { light: "dark", dark: "system", system: "light" };
const ICON = {
  light: (
    <>
      <circle cx="8" cy="8" r="3.25" />
      <path d="M8 1v1.75M8 13.25V15M15 8h-1.75M2.75 8H1M12.95 3.05l-1.24 1.24M4.29 11.71l-1.24 1.24M12.95 12.95l-1.24-1.24M4.29 4.29L3.05 3.05" />
    </>
  ),
  dark: <path d="M13.2 9.6A5.6 5.6 0 016.4 2.8a5.6 5.6 0 106.8 6.8z" />,
  system: (
    <>
      <rect x="1.75" y="2.75" width="12.5" height="8.5" rx="1" />
      <path d="M5.5 13.25h5" />
    </>
  ),
};

export default function ThemeToggle() {
  const { theme, cycle } = useTheme();

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme} — switch to ${NEXT[theme]}`}
      aria-label={`Theme: ${theme}. Switch to ${NEXT[theme]}.`}
      className="text-ink-muted transition-colors hover:text-ink"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICON[theme]}
      </svg>
    </button>
  );
}
