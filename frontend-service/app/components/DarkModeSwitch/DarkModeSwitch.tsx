'use client'
import useDarkMode from "@/app/hooks/useDarkMode";
import { Button } from "@mui/material";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import styles from "./DarkModeSwitch.module.css"

export default function DarkModeSwitch() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <Button
      onClick={toggleDarkMode}
      className={styles.actionButton}
      sx={{
        all: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      {isDarkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
          <MoonIcon className="w-6 h-6 text-slate-600" />
      )}
    </Button>
  );
}
