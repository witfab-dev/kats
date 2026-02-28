// src/pages/PrivacyPolicy.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Accordion, Alert } from 'react-bootstrap';
import { 
  FaShieldAlt, 
  FaUserLock, 
  FaCookieBite, 
  FaEye,
  FaDownload,
  FaPrint,
  FaQuestionCircle,
  FaCheckCircle,
  FaEnvelope
} from 'react-icons/fa';
import { schoolInfo } from '../assets/data/constants';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(true);
  const [userChoices, setUserChoices] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    personalization: false
  });

  const handleCookieConsent = () => {
    setAcceptedCookies(true);
    setShowConsentForm(false);
    // In a real app, you would save this to localStorage
    localStorage.setItem('cookieConsent', JSON.stringify(userChoices));
  };

  const updateUserChoice = (type, value) => {
    setUserChoices(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const policySections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Kirehe Adventist Technical Secondary School ("KATSS", "we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ${window.location.hostname}.`,
      icon: <FaShieldAlt />
    },
    {
      id: 'data-collection',
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, such as when you fill out forms, register for events, apply for admission, or contact us. This may include:
      • Personal identification information (name, email address, phone number)
      • Academic information (previous schools, grades, program interests)
      • Demographic information (age, gender, nationality)
      • Technical information (IP address, browser type, device information)`,
      subpoints: [
        'Personal information provided during admissions',
        'Contact information for newsletter subscriptions',
        'Technical data for website analytics',
        'Cookies and similar tracking technologies'
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      content: 'We use the information we collect to:',
      subpoints: [
        'Process admissions applications and inquiries',
        'Communicate important school updates and events',
        'Improve our website and services',
        'Comply with legal obligations',
        'Provide personalized educational services'
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing and Disclosure',
      content: 'We do not sell your personal information. We may share your information with:',
      subpoints: [
        'School administration and faculty for academic purposes',
        'Government authorities as required by law',
        'Service providers who assist in school operations',
        'Educational partners for program development'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure.`,
      icon: <FaUserLock />
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      content: `Our website uses cookies to enhance user experience. Cookies are small files stored on your device that help us remember your preferences and understand how you use our site.`,
      icon: <FaCookieBite />,
      subpoints: [
        'Essential cookies for website functionality',
        'Analytics cookies to understand usage patterns',
        'Preference cookies to remember your settings'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      content: 'You have the right to:',
      subpoints: [
        'Access your personal information',
        'Correct inaccurate information',
        'Request deletion of your information',
        'Object to processing of your information',
        'Withdraw consent at any time'
      ]
    },
    {
      id: 'children-privacy',
      title: "Children's Privacy",
      content: `We are committed to protecting children's privacy. Our website is not intended for children under 13, and we do not knowingly collect personal information from children without parental consent.`
    },
    {
      id: 'policy-updates',
      title: 'Policy Updates',
      content: `We may update this Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.`
    }
  ];

  const lastUpdated = 'December 15, 2024';

  return (
    <Container className="privacy-policy-page">
      {/* Cookie Consent Banner */}
      {showConsentForm && !acceptedCookies && (
        <div className="cookie-consent-banner">
          <div className="banner-content">
            <div className="banner-text">
              <FaCookieBite className="me-2" />
              <strong>We use cookies</strong>
              <p className="mb-0 small">
                This website uses cookies to enhance your experience and analyze site traffic. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="banner-actions">
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => setShowConsentForm(false)}
                className="me-2"
              >
                Customize
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={handleCookieConsent}
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Customization Modal */}
      {showConsentForm && !acceptedCookies && (
        <div className="cookie-customization-modal">
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaCookieBite className="me-2" />
                Cookie Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-4">
                Choose which types of cookies you want to accept. Essential cookies are required for the website to function properly.
              </p>
              
              {[
                { id: 'essential', label: 'Essential Cookies', description: 'Required for basic website functionality', required: true },
                { id: 'analytics', label: 'Analytics Cookies', description: 'Help us understand how visitors use our site' },
                { id: 'marketing', label: 'Marketing Cookies', description: 'Used to deliver relevant advertisements' },
                { id: 'personalization', label: 'Personalization Cookies', description: 'Remember your preferences and settings' }
              ].map(cookie => (
                <div key={cookie.id} className="cookie-option mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{cookie.label}</h6>
                      <p className="small text-muted mb-0">{cookie.description}</p>
                    </div>
                    <Form.Check
                      type="switch"
                      checked={userChoices[cookie.id]}
                      onChange={(e) => updateUserChoice(cookie.id, e.target.checked)}
                      disabled={cookie.required}
                    />
                  </div>
                </div>
              ))}
              
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConsentForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCookieConsent}
                >
                  Save Preferences
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Policy Header */}
      <div className="policy-header text-center mb-5">
        <h1 className="display-4 mb-3">
          <FaShieldAlt className="me-3" />
          Privacy Policy
        </h1>
        <p className="lead mb-4">
          Protecting your privacy is our priority. This policy explains how we handle your personal information.
        </p>
        
        <div className="policy-meta d-flex justify-content-center gap-4 mb-4">
          <div className="meta-item">
            <strong>Last Updated:</strong> {lastUpdated}
          </div>
          <div className="meta-item">
            <strong>Version:</strong> 2.1
          </div>
          <div className="meta-item">
            <strong>Applicable To:</strong> All Website Visitors
          </div>
        </div>
        
        <div className="policy-actions">
          <Button variant="outline-primary" className="me-2">
            <FaDownload className="me-2" />
            Download PDF
          </Button>
          <Button variant="outline-secondary" className="me-2" onClick={() => window.print()}>
            <FaPrint className="me-2" />
            Print Policy
          </Button>
          <Button variant="outline-info" as="a" href="#faq">
            <FaQuestionCircle className="me-2" />
            Read FAQ
          </Button>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">Quick Navigation</h5>
          <div className="policy-navigation">
            {policySections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="nav-link"
              >
                {section.icon && <span className="nav-icon">{section.icon}</span>}
                {section.title}
              </a>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Policy Content */}
      <Row>
        <Col lg={8}>
          <div className="policy-content">
            {policySections.map((section, index) => (
              <Card key={section.id} id={section.id} className="mb-4 policy-section">
                <Card.Header>
                  <h3 className="mb-0">
                    {section.icon && <span className="me-2">{section.icon}</span>}
                    {section.title}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <p className="section-content">{section.content}</p>
                  
                  {section.subpoints && (
                    <ul className="section-subpoints">
                      {section.subpoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        
        <Col lg={4}>
          {/* Data Controller Info */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Data Controller</h5>
            </Card.Header>
            <Card.Body>
              <div className="controller-info">
                <h6 className="mb-3">{schoolInfo.name}</h6>
                <div className="contact-info">
                  <p className="mb-2">
                    <strong>Address:</strong><br />
                    {schoolInfo.contact.address}
                  </p>
                  <p className="mb-2">
                    <strong>Email:</strong><br />
                    <a href={`mailto:${schoolInfo.contact.email}`}>{schoolInfo.contact.email}</a>
                  </p>
                  <p className="mb-0">
                    <strong>Phone:</strong><br />
                    <a href={`tel:${schoolInfo.contact.phone}`}>{schoolInfo.contact.phone}</a>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Data Protection Officer */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaUserLock className="me-2" />
                Data Protection Officer
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="dpo-info">
                <p className="mb-3">
                  For privacy-related inquiries, contact our Data Protection Officer:
                </p>
                <div className="contact-details">
                  <p className="mb-2">
                    <strong>Email:</strong><br />
                    <a href="mailto:dpo@katss.ac.rw">dpo@katss.ac.rw</a>
                  </p>
                  <p className="mb-0">
                    <strong>Response Time:</strong><br />
                    Within 7 business days
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Your Rights Card */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Exercise Your Rights</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Request Type</Form.Label>
                  <Form.Select>
                    <option>Select request type</option>
                    <option>Access my personal data</option>
                    <option>Correct my information</option>
                    <option>Delete my information</option>
                    <option>Object to data processing</option>
                    <option>Other inquiry</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Your email address" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Describe your request..." />
                </Form.Group>
                
                <Button variant="primary" className="w-100">
                  <FaEnvelope className="me-2" />
                  Submit Request
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FAQ Section */}
      <div id="faq" className="faq-section mt-5">
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <Accordion>
          {[
            {
              q: "How long do you keep my personal information?",
              a: "We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements."
            },
            {
              q: "Do you share my information with third parties?",
              a: "We only share information with third parties who assist us in operating our school, and only to the extent necessary for them to perform their services. All third parties are contractually obligated to protect your information."
            },
            {
              q: "How can I update my information?",
              a: "You can update your information by contacting the administration office or through the student/parent portal. For alumni, please contact the alumni relations department."
            },
            {
              q: "Is my information secure?",
              a: "We implement appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure. We encourage you to take precautions to protect your personal information."
            },
            {
              q: "Do you comply with data protection regulations?",
              a: "Yes, we comply with applicable data protection laws and regulations, including those specific to educational institutions in Rwanda."
            }
          ].map((faq, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              <Accordion.Header>{faq.q}</Accordion.Header>
              <Accordion.Body>{faq.a}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Compliance Badges */}
      <div className="compliance-badges text-center mt-5">
        <h5 className="mb-4">Our Compliance & Certifications</h5>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          <div className="badge-item">
            <div className="badge-icon">
              <FaCheckCircle size={32} className="text-success" />
            </div>
            <div className="badge-text">GDPR Compliant</div>
          </div>
          <div className="badge-item">
            <div className="badge-icon">
              <FaShieldAlt size={32} className="text-primary" />
            </div>
            <div className="badge-text">Data Security Certified</div>
          </div>
          <div className="badge-item">
            <div className="badge-icon">
              <FaEye size={32} className="text-info" />
            </div>
            <div className="badge-text">Transparency Committed</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;