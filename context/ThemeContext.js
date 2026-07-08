import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const lightColors = {
  background: '#F8F9FD',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F4F5',
  textPrimary: '#111114',
  textSecondary: '#71717A',
  border: '#E4E4E9',
  primary: '#5D3EFF',
  primaryLight: '#E4DFFF',
  primarySuperLight: '#F8F6FF',
  danger: '#EF4444',
  dangerLight: '#FFE4E4',
  dangerText: '#D00000',
  success: '#C8F322',
  successText: '#3D4D00',
  iconInactive: '#71717A',
  stepperBg: '#F8F9FD',
};

export const darkColors = {
  background: '#09090B',
  surface: '#18181B',
  surfaceAlt: '#27272A',
  textPrimary: '#FAFAFA',
  textSecondary: '#A1A1AA',
  border: '#3F3F46',
  primary: '#7C66FF',
  primaryLight: '#2D235F',
  primarySuperLight: '#1E173E',
  danger: '#F87171',
  dangerLight: '#451A1A',
  dangerText: '#FCA5A5',
  success: '#4D6200',
  successText: '#D9F99D',
  iconInactive: '#A1A1AA',
  stepperBg: '#18181B',
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState('light');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
