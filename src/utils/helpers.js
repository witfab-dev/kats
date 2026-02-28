// src/utils/helpers.js
/**
 * General helper utilities for the school website
 */

import { schoolInfo } from '../assets/data/constants';

// Date and Time Helpers
export const formatDate = (date, format = 'full') => {
  const d = new Date(date);
  
  const formats = {
    short: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    medium: d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }),
    full: d.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }),
    time: d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    }),
    datetime: d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  return formats[format] || d.toLocaleDateString();
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 30) {
    return `${Math.floor(diffDay / 30)} months ago`;
  } else if (diffDay > 0) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// String Manipulation
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateId = (prefix = 'id') => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Number Formatting
export const formatNumber = (num, options = {}) => {
  const {
    decimals = 0,
    thousandSeparator = ',',
    decimalSeparator = '.',
    currency = ''
  } = options;

  let [integer, decimal] = num.toFixed(decimals).split('.');
  
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  
  let result = integer;
  if (decimals > 0) {
    result += decimalSeparator + decimal;
  }
  
  if (currency) {
    result = `${currency} ${result}`;
  }
  
  return result;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Array and Object Manipulation
export const sortByProperty = (array, property, order = 'asc') => {
  const sorted = [...array].sort((a, b) => {
    const aValue = getNestedProperty(a, property);
    const bValue = getNestedProperty(b, property);
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const groupKey = getNestedProperty(item, key);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

export const getNestedProperty = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// DOM and Browser Utilities
export const scrollToElement = (elementId, offset = 0, behavior = 'smooth') => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior
    });
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
};

export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// School-Specific Helpers
export const generateApplicationNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `APP-${year}-${random}`;
};

export const getProgramDuration = (programName) => {
  const durations = {
    'Software Development': '2 years',
    'Building Construction': '3 years',
    'Accounting': '2 years',
    'Tourism & Hospitality': '2 years',
    'Automobile Technology': '3 years',
    'Multimedia Production': '2 years',
    'General Education': '6 years'
  };
  
  return durations[programName] || 'Contact admissions';
};

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const getSchoolYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Academic year runs from January to November
  if (month >= 0 && month <= 10) {
    return `${year}-${year + 1}`;
  } else {
    return `${year + 1}-${year + 2}`;
  }
};

// File Handling
export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateFile = (file, options = {}) => {
  const {
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxSize = 5 * 1024 * 1024, // 5MB
    minSize = 0
  } = options;

  const errors = [];

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    errors.push(`File size ${formatFileSize(file.size)} exceeds maximum allowed size of ${formatFileSize(maxSize)}`);
  }

  if (file.size < minSize) {
    errors.push(`File size ${formatFileSize(file.size)} is below minimum required size of ${formatFileSize(minSize)}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// URL and Query Parameters
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
};

export const updateQueryParams = (params) => {
  const url = new URL(window.location);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  
  window.history.pushState({}, '', url);
};

export const generateShareUrl = (title, text, url) => {
  const shareData = {
    title,
    text,
    url: url || window.location.href
  };
  
  return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
};

// Performance and Optimization
export const lazyLoadImage = (imgElement) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    observer.observe(imgElement);
  } else {
    // Fallback for older browsers
    imgElement.src = imgElement.dataset.src;
    imgElement.classList.remove('lazy');
  }
};

export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    })
  );
};

// Local Storage with Expiry
export const setWithExpiry = (key, value, ttl) => {
  const item = {
    value,
    expiry: Date.now() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  
  if (Date.now() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  
  return item.value;
};

// Error Handling
export const safeCall = (fn, defaultValue = null) => {
  try {
    return fn();
  } catch (error) {
    console.error('Safe call error:', error);
    return defaultValue;
  }
};

export const retry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Color Utilities
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const getContrastColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

// Export all helpers
export default {
  // Date and Time
  formatDate,
  getRelativeTime,
  formatDuration,
  
  // String
  truncateText,
  capitalizeWords,
  slugify,
  generateId,
  
  // Number
  formatNumber,
  formatFileSize,
  
  // Array and Object
  sortByProperty,
  groupBy,
  getNestedProperty,
  deepClone,
  
  // DOM and Browser
  scrollToElement,
  copyToClipboard,
  isElementInViewport,
  debounce,
  throttle,
  
  // School Specific
  generateApplicationNumber,
  getProgramDuration,
  calculateAge,
  getSchoolYear,
  
  // File Handling
  readFileAsDataURL,
  validateFile,
  
  // URL
  getQueryParams,
  updateQueryParams,
  generateShareUrl,
  
  // Performance
  lazyLoadImage,
  preloadImages,
  
  // Storage
  setWithExpiry,
  getWithExpiry,
  
  // Error Handling
  safeCall,
  retry,
  
  // Color
  hexToRgb,
  getContrastColor
};