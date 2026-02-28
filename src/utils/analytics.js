/**
 * Analytics utility for tracking user behavior and page views
 */

import { schoolInfo } from '../assets/data/constants';

// Configuration
const analyticsConfig = {
  // Google Analytics 4
  ga4MeasurementId: process.env.REACT_APP_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Google Analytics (Universal Analytics - Optional)
  uaTrackingId: process.env.REACT_APP_UA_TRACKING_ID || 'UA-XXXXXXXXX-X',
  
  // Facebook Pixel
  facebookPixelId: process.env.REACT_APP_FACEBOOK_PIXEL_ID || '',
  
  // Custom Analytics API
  customAnalyticsEndpoint: process.env.REACT_APP_ANALYTICS_API_URL || '',
  customApiKey: process.env.REACT_APP_ANALYTICS_API_KEY || '',
  
  // Development mode
  debug: process.env.NODE_ENV === 'development',
  
  // Sampling rate (0 to 1, 1 = track all)
  samplingRate: 1.0
};

// Check if we should track (respects sampling rate and user preferences)
const shouldTrack = () => {
  // Respect "Do Not Track" browser setting
  if (navigator.doNotTrack === '1') {
    return false;
  }
  
  // Check local storage for user preference
  const userOptOut = localStorage.getItem('analytics_opt_out');
  if (userOptOut === 'true') {
    return false;
  }
  
  // Apply sampling rate
  if (analyticsConfig.samplingRate < 1.0) {
    return Math.random() < analyticsConfig.samplingRate;
  }
  
  return true;
};

// Initialize analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return; // Skip during SSR
  
  console.log('📊 Initializing analytics...');
  
  // Initialize Google Analytics 4
  if (analyticsConfig.ga4MeasurementId) {
    initializeGA4();
  }
  
  // Initialize Facebook Pixel
  if (analyticsConfig.facebookPixelId) {
    initializeFacebookPixel();
  }
  
  // Initialize custom analytics
  if (analyticsConfig.customAnalyticsEndpoint) {
    initializeCustomAnalytics();
  }
  
  console.log('📊 Analytics initialized');
};

// Google Analytics 4 Initialization
const initializeGA4 = () => {
  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', analyticsConfig.ga4MeasurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      send_page_view: false // We'll send page views manually
    });
    
    if (analyticsConfig.debug) {
      console.log('📊 GA4 initialized');
    }
  }
};

// Facebook Pixel Initialization
const initializeFacebookPixel = () => {
  if (!window.fbq) {
    window.fbq = function() {
      window.fbq.callMethod ? 
        window.fbq.callMethod.apply(window.fbq, arguments) : 
        window.fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];
    
    // Initialize Pixel
    window.fbq('init', analyticsConfig.facebookPixelId);
    window.fbq('track', 'PageView');
    
    if (analyticsConfig.debug) {
      console.log('📊 Facebook Pixel initialized');
    }
  }
};

// Custom Analytics Initialization
const initializeCustomAnalytics = () => {
  if (analyticsConfig.debug) {
    console.log('📊 Custom analytics enabled');
  }
};

// Main page tracking function
export const trackPageView = async (pagePath, additionalParams = {}) => {
  if (typeof window === 'undefined') return; // Skip during SSR
  
  if (!shouldTrack()) {
    if (analyticsConfig.debug) {
      console.log('📊 Tracking skipped (user preference or sampling)');
    }
    return;
  }
  
  const pageTitle = document.title || 'KATSS Website';
  const pageUrl = window.location.href;
  
  // Default parameters
  const defaultParams = {
    page_title: pageTitle,
    page_location: pageUrl,
    page_path: pagePath || window.location.pathname,
    referrer: document.referrer || '',
    user_agent: navigator.userAgent,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    timestamp: new Date().toISOString(),
    school_name: schoolInfo.name,
    environment: process.env.NODE_ENV
  };
  
  const trackingParams = { ...defaultParams, ...additionalParams };
  
  try {
    // Track in Google Analytics 4
    if (window.gtag && analyticsConfig.ga4MeasurementId) {
      window.gtag('event', 'page_view', trackingParams);
    }
    
    // Track in Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
    
    // Track in Universal Analytics (if still using)
    if (window.ga && analyticsConfig.uaTrackingId) {
      window.ga('send', 'pageview', pagePath);
    }
    
    // Send to custom analytics endpoint
    if (analyticsConfig.customAnalyticsEndpoint) {
      await sendToCustomAnalytics('page_view', trackingParams);
    }
    
    // Log in development
    if (analyticsConfig.debug) {
      console.log('📊 Page view tracked:', {
        page: pagePath,
        url: pageUrl,
        title: pageTitle,
        params: trackingParams
      });
    }
    
    // Store in local history (optional, for offline tracking)
    storeOfflineEvent('page_view', trackingParams);
    
  } catch (error) {
    console.error('📊 Analytics error:', error);
    // Don't throw to prevent breaking the app
  }
};

// Event tracking
export const trackEvent = async (eventName, eventParams = {}) => {
  if (typeof window === 'undefined') return;
  
  if (!shouldTrack()) return;
  
  const defaultParams = {
    event_category: 'general',
    event_label: '',
    value: 0,
    non_interaction: false,
    timestamp: new Date().toISOString(),
    user_id: localStorage.getItem('user_id') || 'anonymous',
    session_id: getSessionId()
  };
  
  const fullParams = { ...defaultParams, ...eventParams };
  
  try {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, fullParams);
    }
    
    // Facebook Pixel
    if (window.fbq && eventName === 'purchase') {
      window.fbq('track', 'Purchase', {
        value: fullParams.value,
        currency: 'RWF'
      });
    }
    
    // Custom analytics
    if (analyticsConfig.customAnalyticsEndpoint) {
      await sendToCustomAnalytics('event', {
        event_name: eventName,
        ...fullParams
      });
    }
    
    if (analyticsConfig.debug) {
      console.log('📊 Event tracked:', { eventName, params: fullParams });
    }
    
    // Store for offline
    storeOfflineEvent('custom_event', { event_name: eventName, ...fullParams });
    
  } catch (error) {
    console.error('📊 Event tracking error:', error);
  }
};

// Specific event helpers
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    location: location || window.location.pathname,
    button_name: buttonName
  });
};

export const trackFormSubmission = (formName, success = true, duration = 0) => {
  trackEvent('form_submission', {
    event_category: 'forms',
    event_label: formName,
    form_name: formName,
    success: success,
    duration_ms: duration,
    value: success ? 1 : 0
  });
};

export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_name: fileName,
    file_type: fileType,
    value: 1
  });
};

export const trackOutboundLink = (url, linkText) => {
  trackEvent('outbound_click', {
    event_category: 'engagement',
    event_label: url,
    outbound_link: url,
    link_text: linkText || '',
    value: 1
  });
};

export const trackApplicationStart = (program, level) => {
  trackEvent('application_start', {
    event_category: 'admissions',
    event_label: program,
    program: program,
    level: level,
    value: 1
  });
};

export const trackApplicationComplete = (applicationId, program, duration) => {
  trackEvent('application_complete', {
    event_category: 'admissions',
    event_label: program,
    application_id: applicationId,
    program: program,
    duration_ms: duration,
    value: 1
  });
};

// Custom analytics endpoint
const sendToCustomAnalytics = async (eventType, data) => {
  if (!analyticsConfig.customAnalyticsEndpoint) return;
  
  try {
    const response = await fetch(analyticsConfig.customAnalyticsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${analyticsConfig.customApiKey}`,
        'X-API-Key': analyticsConfig.customApiKey
      },
      body: JSON.stringify({
        type: eventType,
        data: data,
        timestamp: new Date().toISOString(),
        source: 'web',
        version: '1.0'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('📊 Custom analytics error:', error);
    // Store failed events for retry
    storeFailedEvent(eventType, data, error.message);
  }
};

// Session management
let sessionId = null;

const getSessionId = () => {
  if (!sessionId) {
    sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('analytics_session_id', sessionId);
      localStorage.setItem('analytics_session_start', new Date().toISOString());
      
      // Track session start
      trackEvent('session_start', {
        event_category: 'session',
        session_id: sessionId
      });
    }
  }
  return sessionId;
};

const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Offline storage for events
const storeOfflineEvent = (eventType, data) => {
  if (typeof window === 'undefined') return;
  
  try {
    const offlineEvents = JSON.parse(localStorage.getItem('analytics_offline_events') || '[]');
    offlineEvents.push({
      type: eventType,
      data: data,
      stored_at: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (offlineEvents.length > 100) {
      offlineEvents.splice(0, offlineEvents.length - 100);
    }
    
    localStorage.setItem('analytics_offline_events', JSON.stringify(offlineEvents));
  } catch (error) {
    console.error('📊 Failed to store offline event:', error);
  }
};

const storeFailedEvent = (eventType, data, error) => {
  if (typeof window === 'undefined') return;
  
  try {
    const failedEvents = JSON.parse(localStorage.getItem('analytics_failed_events') || '[]');
    failedEvents.push({
      type: eventType,
      data: data,
      error: error,
      failed_at: new Date().toISOString()
    });
    
    localStorage.setItem('analytics_failed_events', JSON.stringify(failedEvents));
  } catch (error) {
    // Silently fail
  }
};

// Retry failed events
export const retryFailedEvents = async () => {
  if (typeof window === 'undefined') return;
  
  try {
    const failedEvents = JSON.parse(localStorage.getItem('analytics_failed_events') || '[]');
    if (failedEvents.length === 0) return;
    
    const successful = [];
    
    for (const event of failedEvents) {
      try {
        await sendToCustomAnalytics(event.type, event.data);
        successful.push(event);
      } catch (error) {
        // Keep failed events for next retry
      }
    }
    
    // Remove successfully sent events
    const remaining = failedEvents.filter(e => !successful.includes(e));
    localStorage.setItem('analytics_failed_events', JSON.stringify(remaining));
    
    if (analyticsConfig.debug) {
      console.log(`📊 Retried ${successful.length} events, ${remaining.length} remain`);
    }
    
  } catch (error) {
    console.error('📊 Failed to retry events:', error);
  }
};

// User opt-in/opt-out
export const setAnalyticsOptOut = (optOut) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('analytics_opt_out', optOut.toString());
  
  if (optOut) {
    // Clear session data
    localStorage.removeItem('analytics_session_id');
    localStorage.removeItem('analytics_session_start');
    
    // Disable GA tracking
    if (window.gtag) {
      window.gtag('config', analyticsConfig.ga4MeasurementId, {
        'allow_ad_personalization_signals': false,
        'allow_google_signals': false
      });
    }
    
    trackEvent('analytics_opt_out');
    
  } else {
    // Re-enable tracking
    initializeAnalytics();
    trackEvent('analytics_opt_in');
  }
  
  if (analyticsConfig.debug) {
    console.log(`📊 Analytics ${optOut ? 'disabled' : 'enabled'} by user`);
  }
};

// Get analytics status
export const getAnalyticsStatus = () => {
  if (typeof window === 'undefined') {
    return { enabled: false, reason: 'server_side' };
  }
  
  const userOptOut = localStorage.getItem('analytics_opt_out') === 'true';
  const doNotTrack = navigator.doNotTrack === '1';
  
  return {
    enabled: !userOptOut && !doNotTrack,
    user_opt_out: userOptOut,
    do_not_track: doNotTrack,
    session_id: getSessionId(),
    session_start: localStorage.getItem('analytics_session_start'),
    environment: process.env.NODE_ENV
  };
};

// Initialize on load
if (typeof window !== 'undefined') {
  // Initialize after a short delay to not block page load
  setTimeout(() => {
    initializeAnalytics();
    
    // Retry any failed events from previous sessions
    retryFailedEvents();
    
    // Set up periodic sync
    setInterval(retryFailedEvents, 5 * 60 * 1000); // Every 5 minutes
  }, 1000);
}

// Export all functions
export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackFormSubmission,
  trackDownload,
  trackOutboundLink,
  trackApplicationStart,
  trackApplicationComplete,
  setAnalyticsOptOut,
  getAnalyticsStatus,
  retryFailedEvents
};