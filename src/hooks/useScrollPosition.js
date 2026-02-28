// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
    direction: 'down',
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
    velocity: 0
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  useEffect(() => {
    let ticking = false;
    let animationFrameId = null;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        
        animationFrameId = requestAnimationFrame(() => {
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          const currentX = window.pageXOffset || document.documentElement.scrollLeft;
          const currentTime = Date.now();
          const timeDiff = currentTime - lastScrollTime;
          
          // Calculate direction
          const direction = currentY > lastScrollY ? 'down' : 'up';
          
          // Calculate velocity (pixels per second)
          const velocity = timeDiff > 0 
            ? Math.abs(currentY - lastScrollY) / (timeDiff / 1000)
            : 0;
          
          // Calculate scroll percentage
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const maxScroll = documentHeight - windowHeight;
          const scrollPercentage = maxScroll > 0 
            ? Math.min(Math.round((currentY / maxScroll) * 100), 100)
            : 0;
          
          // Check if at top or bottom
          const isAtTop = currentY <= 10;
          const isAtBottom = currentY >= maxScroll - 10;
          
          setScrollPosition({
            x: currentX,
            y: currentY,
            direction,
            isAtTop,
            isAtBottom,
            scrollPercentage,
            velocity
          });
          
          setLastScrollY(currentY);
          setLastScrollTime(currentTime);
          ticking = false;
        });
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [lastScrollY, lastScrollTime]);

  // Return helper methods
  const scrollToTop = (behavior = 'smooth') => {
    window.scrollTo({ top: 0, behavior });
  };

  const scrollToBottom = (behavior = 'smooth') => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior 
    });
  };

  const scrollToElement = (elementId, offset = 0, behavior = 'smooth') => {
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

  const scrollToPercentage = (percentage, behavior = 'smooth') => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (percentage / 100) * maxScroll;
    
    window.scrollTo({
      top: targetY,
      behavior
    });
  };

  const isScrollingFast = () => {
    return scrollPosition.velocity > 100; // pixels per second
  };

  return {
    ...scrollPosition,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    scrollToPercentage,
    isScrollingFast,
    // Aliases for convenience
    position: scrollPosition,
    isScrolled: scrollPosition.y > 100,
    isNearBottom: scrollPosition.scrollPercentage > 90,
    isNearTop: scrollPosition.scrollPercentage < 10
  };
};

export default useScrollPosition;