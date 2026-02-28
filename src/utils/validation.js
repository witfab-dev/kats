// src/utils/validation.js
/**
 * Validation utilities for forms and data
 */

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  if (email.length > 255) return 'Email is too long (max 255 characters)';
  return null;
};

// Phone number validation (Rwanda format)
export const validatePhone = (phone) => {
  const phoneRegex = /^(?:\+250|250|0)?(7[238]\d{7})$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid Rwandan phone number (e.g., +250 78X XXX XXX)';
  }
  return null;
};

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  const nameRegex = /^[A-Za-z\s\-']+$/;
  if (!name) return `${fieldName} is required`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  if (name.length > 100) return `${fieldName} is too long (max 100 characters)`;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 128) return 'Password is too long (max 128 characters)';
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  const errors = [];
  if (!hasUpperCase) errors.push('one uppercase letter');
  if (!hasLowerCase) errors.push('one lowercase letter');
  if (!hasNumbers) errors.push('one number');
  if (!hasSpecialChar) errors.push('one special character');
  
  if (errors.length > 0) {
    return `Password must contain at least ${errors.join(', ')}`;
  }
  
  return null;
};

// Date validation
export const validateDate = (date, options = {}) => {
  const {
    required = true,
    minDate = null,
    maxDate = null,
    fieldName = 'Date'
  } = options;

  if (!date) {
    return required ? `${fieldName} is required` : null;
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (minDate) {
    const minDateObj = new Date(minDate);
    if (dateObj < minDateObj) {
      return `${fieldName} must be on or after ${new Date(minDate).toLocaleDateString()}`;
    }
  }

  if (maxDate) {
    const maxDateObj = new Date(maxDate);
    if (dateObj > maxDateObj) {
      return `${fieldName} must be on or before ${new Date(maxDate).toLocaleDateString()}`;
    }
  }

  return null;
};

// Number validation
export const validateNumber = (number, options = {}) => {
  const {
    required = true,
    min = null,
    max = null,
    integer = false,
    fieldName = 'Number'
  } = options;

  if (!number && number !== 0) {
    return required ? `${fieldName} is required` : null;
  }

  const num = parseFloat(number);
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }

  if (integer && !Number.isInteger(num)) {
    return `${fieldName} must be an integer`;
  }

  if (min !== null && num < min) {
    return `${fieldName} must be at least ${min}`;
  }

  if (max !== null && num > max) {
    return `${fieldName} must be at most ${max}`;
  }

  return null;
};

// URL validation
export const validateUrl = (url, options = {}) => {
  const { required = true, fieldName = 'URL' } = options;

  if (!url) {
    return required ? `${fieldName} is required` : null;
  }

  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return 'URL must start with http:// or https://';
    }
  } catch (error) {
    return 'Please enter a valid URL';
  }

  return null;
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    allowedTypes = [],
    maxSize = 5 * 1024 * 1024, // 5MB
    minSize = 0,
    required = true,
    fieldName = 'File'
  } = options;

  if (!file) {
    return required ? `${fieldName} is required` : null;
  }

  const errors = [];

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${formatFileSize(maxSize)}`);
  }

  if (file.size < minSize) {
    errors.push(`File size must be at least ${formatFileSize(minSize)}`);
  }

  // Check file extension
  const extension = file.name.split('.').pop().toLowerCase();
  const allowedExtensions = allowedTypes.map(type => 
    type.split('/')[1]
  ).filter(Boolean);

  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
    errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`);
  }

  return errors.length > 0 ? errors.join('. ') : null;
};

// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value && value !== 0 && value !== false) {
    return `${fieldName} is required`;
  }
  
  if (typeof value === 'string' && value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  
  return null;
};

// Length validation
export const validateLength = (value, options = {}) => {
  const {
    min = 0,
    max = Infinity,
    fieldName = 'Field'
  } = options;

  if (value === null || value === undefined) return null;

  const strValue = String(value);
  
  if (strValue.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  
  if (strValue.length > max) {
    return `${fieldName} must be at most ${max} characters`;
  }
  
  return null;
};

// Rwandan National ID validation
export const validateNationalId = (id) => {
  if (!id) return null; // ID is optional in some cases
  
  const idRegex = /^\d{16}$/;
  if (!idRegex.test(id.replace(/\s/g, ''))) {
    return 'National ID must be 16 digits';
  }
  
  // Basic Luhn algorithm check (simplified)
  const digits = id.replace(/\s/g, '').split('').map(Number);
  let sum = 0;
  let isSecond = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    
    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isSecond = !isSecond;
  }
  
  if (sum % 10 !== 0) {
    return 'National ID appears to be invalid';
  }
  
  return null;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const rules = validationRules[fieldName];
    const value = formData[fieldName];
    let fieldError = null;

    // Apply each validation rule
    for (const rule of rules) {
      if (typeof rule === 'function') {
        fieldError = rule(value, formData);
      } else if (typeof rule === 'object') {
        const { validator, message } = rule;
        if (!validator(value, formData)) {
          fieldError = message;
          break;
        }
      }
      
      if (fieldError) break;
    }

    if (fieldError) {
      errors[fieldName] = fieldError;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Async validation
export const asyncValidate = async (value, asyncValidator) => {
  try {
    await asyncValidator(value);
    return null;
  } catch (error) {
    return error.message || 'Validation failed';
  }
};

// Validation schema builder
export const createValidationSchema = (schema) => {
  return (values) => {
    const errors = {};
    
    Object.keys(schema).forEach(field => {
      const validators = schema[field];
      const value = values[field];
      
      for (const validator of validators) {
        const error = validator(value, values);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    });
    
    return errors;
  };
};

// Common validation rules
export const ValidationRules = {
  required: (fieldName) => (value) => validateRequired(value, fieldName),
  email: () => validateEmail,
  phone: () => validatePhone,
  name: (fieldName) => (value) => validateName(value, fieldName),
  password: () => validatePassword,
  date: (options) => (value) => validateDate(value, options),
  number: (options) => (value) => validateNumber(value, options),
  url: (options) => (value) => validateUrl(value, options),
  file: (options) => (value) => validateFile(value, options),
  length: (options) => (value) => validateLength(value, options),
  nationalId: () => validateNationalId,
  
  // Custom validators
  match: (fieldToMatch, fieldName) => (value, values) => {
    if (value !== values[fieldToMatch]) {
      return `${fieldName} must match`;
    }
    return null;
  },
  
  min: (minValue, fieldName) => (value) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num < minValue) {
      return `${fieldName} must be at least ${minValue}`;
    }
    return null;
  },
  
  max: (maxValue, fieldName) => (value) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num > maxValue) {
      return `${fieldName} must be at most ${maxValue}`;
    }
    return null;
  },
  
  pattern: (pattern, message) => (value) => {
    if (value && !pattern.test(value)) {
      return message;
    }
    return null;
  },
  
  oneOf: (allowedValues, fieldName) => (value) => {
    if (value && !allowedValues.includes(value)) {
      return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
    }
    return null;
  }
};

// Helper for file size formatting
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Export all validation functions
export default {
  validateEmail,
  validatePhone,
  validateName,
  validatePassword,
  validateDate,
  validateNumber,
  validateUrl,
  validateFile,
  validateRequired,
  validateLength,
  validateNationalId,
  validateForm,
  asyncValidate,
  createValidationSchema,
  ValidationRules
};