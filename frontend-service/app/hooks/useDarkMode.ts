'use client'
import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = saved === 'dark' || (!saved && prefersDark);
    setIsDarkMode(enabled);
    document.documentElement.classList.add(enabled ? 'dark' : 'light');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.remove(newMode ? 'light' : 'dark');
      document.documentElement.classList.add(newMode ? 'dark' : 'light');
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return [isDarkMode, toggleDarkMode] as const;
};

export default useDarkMode;
