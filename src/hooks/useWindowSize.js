// src/hooks/useWindowSize.js
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    aspectRatio: undefined,
    orientation: 'landscape',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: 'xs'
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeTimeout, setResizeTimeout] = useState(null);

  useEffect(() => {
    let resizeTimer;
    
    const handleResize = () => {
      // Set resizing state
      setIsResizing(true);
      
      // Clear previous timeout
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      
      // Set new timeout to update after resizing stops
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspectRatio = width / height;
        const orientation = width > height ? 'landscape' : 'portrait';
        
        // Determine device type based on breakpoints
        const breakpoints = {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          '2xl': 1536
        };
        
        let currentBreakpoint = 'xs';
        for (const [breakpoint, minWidth] of Object.entries(breakpoints)) {
          if (width >= minWidth) {
            currentBreakpoint = breakpoint;
          }
        }
        
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;
        
        setWindowSize({
          width,
          height,
          aspectRatio,
          orientation,
          isMobile,
          isTablet,
          isDesktop,
          breakpoint: currentBreakpoint
        });
        
        setIsResizing(false);
      }, 150); // Debounce for 150ms
      
      setResizeTimeout(resizeTimer);
    };

    // Initial call
    handleResize();

    // Event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
    };
  }, []);

  // Helper methods
  const isBreakpoint = (breakpoint) => {
    const breakpoints = {
      xs: windowSize.width < 640,
      sm: windowSize.width >= 640 && windowSize.width < 768,
      md: windowSize.width >= 768 && windowSize.width < 1024,
      lg: windowSize.width >= 1024 && windowSize.width < 1280,
      xl: windowSize.width >= 1280 && windowSize.width < 1536,
      '2xl': windowSize.width >= 1536
    };
    return breakpoints[breakpoint] || false;
  };

  const isGreaterThan = (breakpoint) => {
    const minWidths = {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    };
    return windowSize.width >= (minWidths[breakpoint] || 0);
  };

  const isLessThan = (breakpoint) => {
    const maxWidths = {
      xs: 640,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1536,
      '2xl': Infinity
    };
    return windowSize.width < (maxWidths[breakpoint] || Infinity);
  };

  const getResponsiveValue = (values) => {
    // values should be an object with breakpoint keys
    // Example: { xs: '100%', sm: '50%', md: '33%', lg: '25%' }
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    
    // Find the appropriate value based on current breakpoint
    for (let i = breakpoints.indexOf(windowSize.breakpoint); i >= 0; i--) {
      const breakpoint = breakpoints[i];
      if (values[breakpoint] !== undefined) {
        return values[breakpoint];
      }
    }
    
    // Fallback to the first value or undefined
    return values[breakpoints[0]];
  };

  return {
    ...windowSize,
    isResizing,
    isBreakpoint,
    isGreaterThan,
    isLessThan,
    getResponsiveValue,
    // Aliases for convenience
    isPortrait: windowSize.orientation === 'portrait',
    isLandscape: windowSize.orientation === 'landscape',
    isTouchDevice: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
  };
};

export default useWindowSize;