
import { Platform } from 'react-native';

export interface ColorScheme {
  background: string;
  text: string;
  textSecondary: string;
  primary: string;
  secondary: string;
  accent: string;
  card: string;
  highlight: string;
  border: string;
  danger: string;
  success: string;
  warning: string;
}

export const lightColors: ColorScheme = {
  background: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  primary: '#E91E63',
  secondary: '#9C27B0',
  accent: '#03A9F4',
  card: '#FFFFFF',
  highlight: '#FF4081',
  border: '#E0E0E0',
  danger: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
};

export const darkColors: ColorScheme = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#FF4081',
  secondary: '#CE93D8',
  accent: '#40C4FF',
  card: '#1E1E1E',
  highlight: '#FF4081',
  border: '#2C2C2C',
  danger: '#EF5350',
  success: '#66BB6A',
  warning: '#FFA726',
};

export function getThemedColors(isDarkMode: boolean): ColorScheme {
  return isDarkMode ? darkColors : lightColors;
}

// Legacy export for backward compatibility
export const colors = lightColors;
