// src/pages/NotFound.jsx
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaSearch, 
  FaEnvelope, 
  FaExclamationTriangle,
  FaArrowLeft,
  FaCompass
} from 'react-icons/fa';
import { quickLinks } from '../assets/data/constants';
import './NotFound.css';

const NotFound = () => {
  return (
    <Container className="not-found-page">
      <Row className="justify-content-center align-items-center min-vh-70">
        <Col md={8} lg={6} className="text-center">
          {/* Error Illustration */}
          <div className="error-illustration mb-5">
            <div className="error-code">
              <span className="digit">4</span>
              <span className="digit zero">
                <FaExclamationTriangle className="exclamation" />
              </span>
              <span className="digit">4</span>
            </div>
            <div className="error-orbits">
              <div className="orbit orbit-1"></div>
              <div className="orbit orbit-2"></div>
              <div className="orbit orbit-3"></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="error-content">
            <h1 className="display-4 mb-3">Page Not Found</h1>
            <p className="lead mb-4">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            
            <div className="error-search mb-5">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What are you looking for?"
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="error-actions mb-5">
              <Button
                as={Link}
                to="/"
                variant="primary"
                size="lg"
                className="me-3"
              >
                <FaHome className="me-2" />
                Back to Home
              </Button>
              
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="me-2" />
                Go Back
              </Button>
            </div>

            {/* Help Card */}
            <Card className="help-card">
              <Card.Body>
                <h5 className="mb-3">
                  <FaCompass className="me-2" />
                  Need Help Finding Something?
                </h5>
                <p className="text-muted mb-4">
                  Here are some common pages you might be looking for:
                </p>
                
                <Row>
                  {quickLinks.slice(0, 4).map((link, index) => (
                    <Col key={index} md={6} className="mb-3">
                      <Button
                        as={Link}
                        to={link.path}
                        variant="light"
                        className="w-100 text-start quick-link-btn"
                      >
                        <span className="quick-link-icon">{link.icon}</span>
                        <span className="quick-link-label">{link.label}</span>
                      </Button>
                    </Col>
                  ))}
                </Row>
                
                <div className="text-center mt-4">
                  <Button
                    as={Link}
                    to="/contact"
                    variant="outline-secondary"
                  >
                    <FaEnvelope className="me-2" />
                    Contact Support
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Sitemap Suggestions */}
            <div className="sitemap-suggestions mt-5">
              <h6 className="mb-3">Popular Sections</h6>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {['Academics', 'Admissions', 'Gallery', 'News & Events', 'Student Life', 'Contact'].map((section, index) => (
                  <Button
                    key={index}
                    as={Link}
                    to={`/${section.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                    variant="outline-light"
                    size="sm"
                    className="sitemap-link"
                  >
                    {section}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Error Details (for developers) */}
      <Card className="error-details mt-5">
        <Card.Header>
          <h6 className="mb-0">Technical Details</h6>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="detail-item">
                <strong>URL:</strong> {window.location.href}
              </div>
              <div className="detail-item">
                <strong>Status Code:</strong> 404
              </div>
              <div className="detail-item">
                <strong>Error Type:</strong> Page Not Found
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-item">
                <strong>Timestamp:</strong> {new Date().toLocaleString()}
              </div>
              <div className="detail-item">
                <strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}...
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                const details = {
                  url: window.location.href,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent
                };
                navigator.clipboard.writeText(JSON.stringify(details, null, 2));
                alert('Error details copied to clipboard');
              }}
            >
              Copy Error Details
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotFound;