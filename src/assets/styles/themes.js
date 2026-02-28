// src/assets/styles/themes.js
export const themes = {
  light: {
    // Primary Colors
    'color-primary': '#003366',
    'color-primary-accent': '#C49A6E',
    'color-secondary': '#004d99',
    
    // Background Colors
    'color-background': '#FFFFFF',
    'color-background-light': '#F8F9FA',
    'color-background-lighter': '#FDFDFD',
    'color-background-dark': '#1a1a2e',
    'color-background-darker': '#16213e',
    
    // Text Colors
    'color-text': '#212529',
    'color-text-light': '#6C757D',
    'color-text-lighter': '#ADB5BD',
    'color-text-on-primary': '#FFFFFF',
    'color-text-on-dark': '#FFFFFF',
    
    // Border Colors
    'color-border': '#DEE2E6',
    'color-border-light': '#E9ECEF',
    'color-border-dark': '#CED4DA',
    
    // Status Colors
    'color-success': '#28A745',
    'color-info': '#17A2B8',
    'color-warning': '#FFC107',
    'color-danger': '#DC3545',
    
    // Shadow
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Card
    'card-background': '#FFFFFF',
    'card-border': '#E9ECEF',
    'card-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  
  dark: {
    // Primary Colors (darker for dark mode)
    'color-primary': '#00509E',
    'color-primary-accent': '#E6B17E',
    'color-secondary': '#0066CC',
    
    // Background Colors
    'color-background': '#1A1A2E',
    'color-background-light': '#16213E',
    'color-background-lighter': '#0F3460',
    'color-background-dark': '#0D1117',
    'color-background-darker': '#0A0D14',
    
    // Text Colors
    'color-text': '#E6EDF3',
    'color-text-light': '#8B949E',
    'color-text-lighter': '#6E7681',
    'color-text-on-primary': '#FFFFFF',
    'color-text-on-dark': '#E6EDF3',
    
    // Border Colors
    'color-border': '#30363D',
    'color-border-light': '#21262D',
    'color-border-dark': '#484F58',
    
    // Status Colors (brighter for dark mode)
    'color-success': '#3FB950',
    'color-info': '#58A6FF',
    'color-warning': '#F0883E',
    'color-danger': '#F85149',
    
    // Shadow (darker for dark mode)
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    'shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    
    // Card
    'card-background': '#16213E',
    'card-border': '#30363D',
    'card-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
  },
  
  highContrast: {
    // High contrast colors
    'color-primary': '#000080',
    'color-primary-accent': '#FFFF00',
    'color-secondary': '#0000FF',
    
    // Background Colors
    'color-background': '#FFFFFF',
    'color-background-light': '#F0F0F0',
    'color-background-lighter': '#E0E0E0',
    'color-background-dark': '#000000',
    'color-background-darker': '#111111',
    
    // Text Colors
    'color-text': '#000000',
    'color-text-light': '#333333',
    'color-text-lighter': '#666666',
    'color-text-on-primary': '#FFFFFF',
    'color-text-on-dark': '#FFFFFF',
    
    // Border Colors
    'color-border': '#000000',
    'color-border-light': '#333333',
    'color-border-dark': '#666666',
    
    // Status Colors
    'color-success': '#008000',
    'color-info': '#0000FF',
    'color-warning': '#FFA500',
    'color-danger': '#FF0000',
    
    // Shadow (simplified for high contrast)
    'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.8)',
    'shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.8), 0 1px 2px 0 rgba(0, 0, 0, 0.8)',
    'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.8), 0 2px 4px -1px rgba(0, 0, 0, 0.8)',
    'shadow-lg': 'none',
    'shadow-xl': 'none',
    
    // Card
    'card-background': '#FFFFFF',
    'card-border': '#000000',
    'card-shadow': '0 0 0 2px #000000'
  }
};