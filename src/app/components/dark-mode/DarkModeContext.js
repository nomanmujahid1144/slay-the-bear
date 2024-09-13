// DarkModeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for Dark Mode
const DarkModeContext = createContext();

// Create a Provider Component
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the DarkModeContext
export const useDarkMode = () => useContext(DarkModeContext);
