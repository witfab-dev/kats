import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  fullScreen = false, 
  message = 'Loading...',
  size = 'lg',
  variant = 'primary',
  center = true,
  className = ''
}) => {
  
  const getSize = () => {
    switch(size) {
      case 'sm': return { spinner: 'sm', text: 'small' };
      case 'lg': return { spinner: undefined, text: 'h5' };
      case 'xl': return { spinner: undefined, text: 'h4' };
      default: return { spinner: undefined, text: 'h5' };
    }
  };

  const spinnerSize = getSize().spinner;
  const textSize = getSize().text;

  const SpinnerContent = () => (
    <div className={`loading-content ${center ? 'text-center' : ''}`}>
      <Spinner 
        animation="border" 
        role="status" 
        variant={variant}
        size={spinnerSize}
        className="loading-spinner"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && (
        <div className={`loading-message mt-3 ${textSize}`}>
          {message}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`loading-fullscreen ${className}`}>
        <Container className="h-100">
          <Row className="h-100 align-items-center justify-content-center">
            <Col xs={12} className="text-center">
              <div className="loading-brand mb-4">
                <img 
                  src="/images/logo.jpeg" 
                  alt="KATSS Logo" 
                  height="60"
                  className="rounded-circle mb-3"
                />
                <h4 className="text-primary fw-bold">KATSS</h4>
                <p className="text-muted">Loading please wait...</p>
              </div>
              <SpinnerContent />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className={`loading-container ${className}`}>
      <SpinnerContent />
    </div>
  );
};

// Additional loading components for different use cases
export const PageLoader = () => (
  <LoadingSpinner 
    fullScreen 
    message="Loading page content..."
    size="xl"
  />
);

export const ContentLoader = ({ message = 'Loading content...' }) => (
  <Container className="py-5">
    <Row className="justify-content-center">
      <Col md={6} className="text-center">
        <LoadingSpinner message={message} />
      </Col>
    </Row>
  </Container>
);

export const ButtonLoader = ({ text = 'Loading...' }) => (
  <div className="d-inline-flex align-items-center">
    <Spinner animation="border" size="sm" className="me-2" />
    <span>{text}</span>
  </div>
);

export const SkeletonLoader = ({ count = 1, height = 20, className = '' }) => {
  const skeletons = Array(count).fill(0);
  
  return (
    <div className={`skeleton-loader ${className}`}>
      {skeletons.map((_, index) => (
        <div 
          key={index}
          className="skeleton-item shimmer"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;