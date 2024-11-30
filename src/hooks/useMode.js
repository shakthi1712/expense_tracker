import { useState, useEffect } from 'react';

export const useMode = () => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode ? savedMode : 'light'; // Default to light mode if not set
  });

  useEffect(() => {
    // Apply the mode class to the root element
    if (mode === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }

    // Save the mode to localStorage for persistence
    localStorage.setItem('mode', mode);
  }, [mode]);

  return { mode, setMode };
};
