import React, { Component } from 'react';
import { Container, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaExclamationTriangle, FaRedo, FaHome, FaEnvelope } from 'react-icons/fa';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: true
      });
    }

    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReport = () => {
    const errorDetails = `
      Error: ${this.state.error?.toString()}
      Component Stack: ${this.state.errorInfo?.componentStack}
      URL: ${window.location.href}
      User Agent: ${navigator.userAgent}
    `;

    const mailtoLink = `mailto:katsapapen@gmail.com?subject=Website Error Report&body=${encodeURIComponent(errorDetails)}`;
    window.open(mailtoLink, '_blank');
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="error-boundary py-5">
          <Row className="justify-content-center align-items-center min-vh-50">
            <Col md={8} lg={6} className="text-center">
              <div className="error-icon mb-4">
                <FaExclamationTriangle size={80} className="text-danger" />
              </div>
              
              <h1 className="display-5 fw-bold text-danger mb-3">
                Oops! Something went wrong
              </h1>
              
              <p className="lead text-muted mb-4">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>

              <Alert variant="light" className="mb-4">
                <Alert.Heading>Technical Details</Alert.Heading>
                <p className="small mb-2">
                  {this.state.error?.toString() || 'Unknown error occurred'}
                </p>
                
                {this.state.showDetails && this.state.errorInfo && (
                  <pre className="error-details small mt-3">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
                
                <Button
                  variant="link"
                  size="sm"
                  className="p-0"
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                >
                  {this.state.showDetails ? 'Hide details' : 'Show technical details'}
                </Button>
              </Alert>

              <div className="error-actions d-flex flex-wrap justify-content-center gap-3 mb-5">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-4"
                  onClick={this.handleRetry}
                >
                  <FaRedo className="me-2" />
                  Reload Page
                </Button>
                
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="px-4"
                  onClick={this.handleGoHome}
                >
                  <FaHome className="me-2" />
                  Go to Homepage
                </Button>
                
                <Button
                  variant="outline-danger"
                  size="lg"
                  className="px-4"
                  onClick={this.handleReport}
                >
                  <FaEnvelope className="me-2" />
                  Report Error
                </Button>
              </div>

              <div className="error-help">
                <h6 className="fw-semibold mb-3">Need immediate assistance?</h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="help-option p-3 bg-light rounded">
                      <h6 className="fw-semibold mb-2">Call Us</h6>
                      <p className="mb-0">
                        <a href="tel:+250788416574" className="text-decoration-none">
                          +250 788 416 574
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="help-option p-3 bg-light rounded">
                      <h6 className="fw-semibold mb-2">Email Us</h6>
                      <p className="mb-0">
                        <a href="mailto:katsapapen@gmail.com" className="text-decoration-none">
                          katsapapen@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="error-suggestions mt-5 pt-4 border-top">
                <h6 className="fw-semibold mb-3">What you can try:</h6>
                <ul className="list-unstyled text-start">
                  <li className="mb-2">✓ Refresh the page</li>
                  <li className="mb-2">✓ Clear your browser cache</li>
                  <li className="mb-2">✓ Try a different browser</li>
                  <li className="mb-0">✓ Check your internet connection</li>
                </ul>
              </div>

              <div className="error-footer mt-4">
                <p className="small text-muted mb-0">
                  Error ID: {Date.now()} • {navigator.userAgent.substring(0, 50)}...
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Higher Order Component for error handling
export const withErrorBoundary = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <ErrorBoundary>
          <WrappedComponent {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};

// Error fallback component for React.Suspense
export const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="error-fallback">
    <Container>
      <Row className="justify-content-center">
        <Col md={8} className="text-center py-5">
          <h2 className="text-danger mb-3">Failed to load component</h2>
          <p className="text-muted mb-4">{error.message}</p>
          <Button variant="primary" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ErrorBoundary;