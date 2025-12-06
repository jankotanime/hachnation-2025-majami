'use client'
import useDarkMode from "@/app/hooks/useDarkMode";
import { Button } from "@mui/material";

export default function DarkModeSwitch() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <Button
      variant="contained"
      onClick={toggleDarkMode}
    >
      Tryb: {isDarkMode ? "Dark" : "Light"}
    </Button>
  );
}
