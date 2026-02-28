import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errors, setErrors] = useState({});

  const subjects = [
    'General Inquiry',
    'Admissions Information',
    'Program Details',
    'Fee Structure',
    'Scholarship Information',
    'School Visit Request',
    'Partnership Inquiry',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          to_email: 'katsapapen@gmail.com',
          to_name: 'KATSS Admissions',
          reply_to: formData.email,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Track successful submission
      if (window.gtag) {
        window.gtag('event', 'contact_form_submission', {
          event_category: 'Contact',
          event_label: 'Success'
        });
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      
      if (window.gtag) {
        window.gtag('event', 'contact_form_submission', {
          event_category: 'Contact',
          event_label: 'Failed'
        });
      }

      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="contact-form-container">
      <div className="form-header mb-4">
        <h3 className="text-primary fw-bold">Send Us a Message</h3>
        <p className="text-muted">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <Alert variant="success" className="d-flex align-items-center">
          <FaCheckCircle className="me-3" size={24} />
          <div>
            <h5 className="alert-heading">Message Sent Successfully!</h5>
            <p className="mb-0">
              Thank you for contacting KATSS. We'll respond to your inquiry as soon as possible.
            </p>
          </div>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-3" size={24} />
          <div>
            <h5 className="alert-heading">Message Failed to Send</h5>
            <p className="mb-0">
              There was an error sending your message. Please try again or contact us directly at{' '}
              <a href="mailto:katsapapen@gmail.com" className="alert-link">
                katsapapen@gmail.com
              </a>
            </p>
          </div>
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label className="fw-semibold">
                Full Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-semibold">
                Email Address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label className="fw-semibold">
                Phone Number
                <span className="text-muted small ms-1">(Optional)</span>
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+250 788 123 456"
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll only call if we need to clarify something
              </Form.Text>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formSubject">
              <Form.Label className="fw-semibold">
                Subject <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                isInvalid={!!errors.subject}
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.subject}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group controlId="formMessage">
              <Form.Label className="fw-semibold">
                Your Message <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows={5}
                isInvalid={!!errors.message}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Please provide as much detail as possible so we can assist you better
              </Form.Text>
              <div className="text-end mt-2">
                <small className="text-muted">
                  {formData.message.length}/500 characters
                </small>
              </div>
            </Form.Group>
          </Col>

          <Col xs={12}>
            <div className="form-check mb-4">
              <Form.Check
                type="checkbox"
                id="privacyConsent"
                label={
                  <>
                    I agree to the{' '}
                    <a href="/privacy-policy" className="text-primary">
                      Privacy Policy
                    </a>{' '}
                    and consent to KATSS contacting me about my inquiry
                  </>
                }
                required
              />
            </div>
          </Col>

          <Col xs={12}>
            <div className="d-flex flex-wrap gap-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="px-5 d-flex align-items-center"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="me-2" />
                    Send Message
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                size="lg"
                onClick={handleReset}
                disabled={loading}
              >
                Reset Form
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <div className="contact-alternative mt-5 pt-4 border-top">
        <h5 className="fw-semibold mb-3">Prefer to contact us directly?</h5>
        <Row>
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-start">
              <div className="icon-wrapper bg-primary rounded-circle p-3 me-3">
                <i className="bi bi-telephone text-white"></i>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Call Us</h6>
                <p className="mb-0">
                  <a href="tel:+250788416574" className="text-decoration-none">
                    +250 788 416 574
                  </a>
                </p>
                <small className="text-muted">Mon-Fri, 8AM-5PM</small>
              </div>
            </div>
          </Col>
          
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-start">
              <div className="icon-wrapper bg-primary rounded-circle p-3 me-3">
                <i className="bi bi-envelope text-white"></i>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Email Us</h6>
                <p className="mb-0">
                  <a href="mailto:katsapapen@gmail.com" className="text-decoration-none">
                    katsapapen@gmail.com
                  </a>
                </p>
                <small className="text-muted">Response within 24 hours</small>
              </div>
            </div>
          </Col>
          
          <Col md={4} className="mb-3">
            <div className="d-flex align-items-start">
              <div className="icon-wrapper bg-primary rounded-circle p-3 me-3">
                <i className="bi bi-whatsapp text-white"></i>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">WhatsApp</h6>
                <p className="mb-0">
                  <a 
                    href="https://wa.me/250788416574" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Chat with us
                  </a>
                </p>
                <small className="text-muted">Quick responses</small>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactForm;