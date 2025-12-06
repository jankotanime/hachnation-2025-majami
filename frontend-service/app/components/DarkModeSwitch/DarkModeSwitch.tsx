'use client'
import useDarkMode from "@/app/hooks/useDarkMode";

export default function DarkModeSwitch() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <button onClick={toggleDarkMode}>
      Tryb: {isDarkMode ? "Dark" : "Light"}
    </button>
  );
}
