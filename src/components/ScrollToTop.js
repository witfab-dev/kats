import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowUp, FaChevronUp } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Check scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Up Arrow
      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToTop();
      }
      // Home key
      if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="scroll-to-top-container">
          <Button
            variant="primary"
            className="scroll-to-top-btn shadow-lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top (Ctrl+↑ or Home)"
          >
            <div className="btn-content">
              <FaArrowUp className="arrow-icon" />
              <span className="btn-text">Top</span>
            </div>
            
            {/* Progress circle */}
            <div className="progress-circle">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle
                  cx="30"
                  cy="30"
                  r="27"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="27"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="169.56"
                  strokeDashoffset={169.56 - (169.56 * scrollProgress) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
              </svg>
            </div>
          </Button>

          {/* Scroll percentage indicator */}
          <div className="scroll-percentage">
            <span>{Math.round(scrollProgress)}%</span>
          </div>

          {/* Quick navigation buttons */}
          <div className="quick-navigation">
            <Button
              variant="light"
              size="sm"
              className="quick-nav-btn mb-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Scroll to top"
            >
              <FaChevronUp />
            </Button>
            <Button
              variant="light"
              size="sm"
              className="quick-nav-btn"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              title="Scroll to bottom"
            >
              <FaChevronUp className="rotate-180" />
            </Button>
          </div>
        </div>
      )}

      {/* Scroll progress bar at top */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </>
  );
};

// HOC for components that need scroll restoration
export const withScrollRestoration = (WrappedComponent) => {
  return (props) => {
    const location = useLocation();

    useEffect(() => {
      const scrollPositions = JSON.parse(
        sessionStorage.getItem('scrollPositions') || '{}'
      );
      
      const saveScrollPosition = () => {
        scrollPositions[location.key] = window.pageYOffset;
        sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
      };

      const restoreScrollPosition = () => {
        const savedPosition = scrollPositions[location.key];
        if (savedPosition !== undefined) {
          window.scrollTo(0, savedPosition);
        } else {
          window.scrollTo(0, 0);
        }
      };

      // Restore on mount
      restoreScrollPosition();

      // Save on unmount
      return () => {
        saveScrollPosition();
      };
    }, [location.key]);

    return <WrappedComponent {...props} />;
  };
};

// Hook for manual scroll control
export const useScrollTo = (ref, options = {}) => {
  const scrollTo = (behavior = 'smooth') => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior,
        block: options.block || 'start',
        inline: options.inline || 'nearest',
      });
    }
  };

  return scrollTo;
};

export default ScrollToTop;