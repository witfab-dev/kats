import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './NewsletterForm.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [error, setError] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('general');

  const subscriptionTypes = [
    { value: 'general', label: 'General Updates', description: 'School news and events' },
    { value: 'admissions', label: 'Admissions', description: 'Application deadlines and requirements' },
    { value: 'alumni', label: 'Alumni Network', description: 'Alumni events and opportunities' },
    { value: 'parents', label: 'Parents Portal', description: 'Student progress and school updates' }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        'newsletter_template', // You'll need to create this template in EmailJS
        {
          user_email: email,
          subscription_type: subscriptionType,
          date_subscribed: new Date().toLocaleDateString(),
          unsubscribe_link: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Track subscription
      if (window.gtag) {
        window.gtag('event', 'newsletter_subscription', {
          event_category: 'Subscription',
          event_label: subscriptionType
        });
      }

      setSubmitStatus('success');
      setEmail('');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (err) {
      console.error('Subscription failed:', err);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setError('');
    setSubmitStatus(null);
    setSubscriptionType('general');
  };

  return (
    <div className="newsletter-form-container">
      <div className="newsletter-header mb-4">
        <h5 className="fw-bold text-white mb-2">Subscribe to Our Newsletter</h5>
        <p className="text-light opacity-75 mb-0">
          Get the latest news, events, and updates from KATSS
        </p>
      </div>

      {submitStatus === 'success' && (
        <Alert variant="light" className="mb-4">
          <div className="d-flex align-items-center">
            <FaCheckCircle className="text-success me-3" size={24} />
            <div>
              <h6 className="alert-heading mb-1">Subscription Successful!</h6>
              <p className="mb-0 small">
                Thank you for subscribing. You'll receive our next newsletter soon.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="light" className="mb-4">
          <div className="d-flex align-items-center">
            <FaExclamationTriangle className="text-danger me-3" size={24} />
            <div>
              <h6 className="alert-heading mb-1">Subscription Failed</h6>
              <p className="mb-0 small">
                There was an error processing your subscription. Please try again.
              </p>
            </div>
          </div>
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="newsletter-form">
        <Form.Group className="mb-3">
          <Form.Label className="text-white small fw-semibold">
            Email Address <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="your.email@example.com"
            className="newsletter-input"
            isInvalid={!!error}
            disabled={loading}
          />
          {error && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {error}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-white small fw-semibold">
            What updates would you like to receive?
          </Form.Label>
          <div className="subscription-types">
            {subscriptionTypes.map((type) => (
              <Form.Check
                key={type.value}
                type="radio"
                id={`type-${type.value}`}
                name="subscriptionType"
                value={type.value}
                checked={subscriptionType === type.value}
                onChange={(e) => setSubscriptionType(e.target.value)}
                label={
                  <div className="d-flex flex-column">
                    <span className="fw-medium text-white">{type.label}</span>
                    <small className="text-light opacity-75">{type.description}</small>
                  </div>
                }
                className="subscription-option"
              />
            ))}
          </div>
        </Form.Group>

        <div className="d-grid">
          <Button
            type="submit"
            variant="light"
            size="lg"
            className="fw-semibold d-flex align-items-center justify-content-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Subscribing...
              </>
            ) : (
              <>
                <FaPaperPlane className="me-2" />
                Subscribe Now
              </>
            )}
          </Button>
        </div>

        <div className="mt-3 text-center">
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleReset}
            className="text-light opacity-75"
            disabled={loading}
          >
            Reset Form
          </Button>
        </div>

        <div className="privacy-notice mt-4">
          <p className="small text-light opacity-75 mb-0">
            By subscribing, you agree to receive our newsletters and updates. 
            You can unsubscribe at any time. We respect your privacy and will 
            never share your information. View our{' '}
            <a href="/privacy-policy" className="text-white text-decoration-underline">
              Privacy Policy
            </a>.
          </p>
        </div>
      </Form>

      {/* Subscription Benefits */}
      <div className="subscription-benefits mt-5 pt-4 border-top border-light border-opacity-25">
        <h6 className="text-white fw-semibold mb-3">Why Subscribe?</h6>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="benefit-item text-center">
              <div className="benefit-icon mb-2">
                <i className="bi bi-megaphone text-primary-accent"></i>
              </div>
              <p className="small text-white mb-0">Latest News</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="benefit-item text-center">
              <div className="benefit-icon mb-2">
                <i className="bi bi-calendar-event text-primary-accent"></i>
              </div>
              <p className="small text-white mb-0">Event Updates</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="benefit-item text-center">
              <div className="benefit-icon mb-2">
                <i className="bi bi-award text-primary-accent"></i>
              </div>
              <p className="small text-white mb-0">Achievements</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="benefit-item text-center">
              <div className="benefit-icon mb-2">
                <i className="bi bi-lightbulb text-primary-accent"></i>
              </div>
              <p className="small text-white mb-0">Tips & Resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;