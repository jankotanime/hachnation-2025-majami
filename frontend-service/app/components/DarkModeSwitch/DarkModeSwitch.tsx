'use client'
import useDarkMode from "@/app/hooks/useDarkMode";
import { Button } from "@mui/material";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import styles from "./DarkModeSwitch.module.css"

export default function DarkModeSwitch() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <Button
      variant="contained"
      onClick={toggleDarkMode}
      className={styles.actionButton}
    >
      {isDarkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
          <MoonIcon className="w-6 h-6 text-white-500" />
      )}
    </Button>
  );
}
