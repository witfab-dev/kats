// src/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { themes } from '../assets/styles/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);
    setReducedMotion(savedReducedMotion);

    // Apply initial theme
    applyTheme(savedTheme, savedFontSize, savedHighContrast, savedReducedMotion);
  }, []);

  const applyTheme = (newTheme, newFontSize, newHighContrast, newReducedMotion) => {
    const root = document.documentElement;
    const currentTheme = themes[newTheme];

    // Apply CSS variables
    Object.keys(currentTheme).forEach(key => {
      root.style.setProperty(`--${key}`, currentTheme[key]);
    });

    // Apply font size
    const fontSizeMap = {
      small: '14px',
      normal: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.setProperty('--base-font-size', fontSizeMap[newFontSize]);

    // Apply high contrast
    if (newHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (newReducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('fontSize', newFontSize);
    localStorage.setItem('highContrast', newHighContrast);
    localStorage.setItem('reducedMotion', newReducedMotion);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme, fontSize, highContrast, reducedMotion);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    applyTheme(theme, size, highContrast, reducedMotion);
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    applyTheme(theme, fontSize, newHighContrast, reducedMotion);
  };

  const toggleReducedMotion = () => {
    const newReducedMotion = !reducedMotion;
    setReducedMotion(newReducedMotion);
    applyTheme(theme, fontSize, highContrast, newReducedMotion);
  };

  const resetPreferences = () => {
    setTheme('light');
    setFontSize('normal');
    setHighContrast(false);
    setReducedMotion(false);
    applyTheme('light', 'normal', false, false);
  };

  const getAccessibilityScore = () => {
    let score = 0;
    if (theme === 'dark') score += 25;
    if (fontSize === 'large' || fontSize === 'xlarge') score += 25;
    if (highContrast) score += 25;
    if (reducedMotion) score += 25;
    return score;
  };

  const contextValue = {
    theme,
    fontSize,
    highContrast,
    reducedMotion,
    toggleTheme,
    changeFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetPreferences,
    getAccessibilityScore,
    currentTheme: themes[theme]
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};