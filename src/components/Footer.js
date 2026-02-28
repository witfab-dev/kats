import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, FaYoutube, FaTwitter, FaInstagram, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaArrowRight, FaPaperPlane
} from 'react-icons/fa';
import { BiSolidSchool, BiNews } from 'react-icons/bi';
import NewsletterForm from './NewsletterForm';
import './Footer.css';

const Footer = () => {
  const quickLinks = [
    { path: '/about', label: 'About School', icon: <BiSolidSchool /> },
    { path: '/academics', label: 'Academic Calendar', icon: <BiSolidSchool /> },
    { path: '/programs', label: 'All Programs', icon: <BiSolidSchool /> },
    { path: '/admissions', label: 'Admission Process', icon: <BiSolidSchool /> },
    { path: '/student-life', label: 'Clubs & Activities', icon: <BiSolidSchool /> },
    { path: '/news-events', label: 'Latest News', icon: <BiNews /> },
    { path: '/gallery', label: 'Photo Gallery', icon: <BiSolidSchool /> },
    { path: '/contact', label: 'Contact Us', icon: <BiSolidSchool /> },
  ];

  const resources = [
    { path: '/downloads/prospectus', label: 'School Prospectus' },
    { path: '/downloads/fee-structure', label: 'Fee Structure' },
    { path: '/downloads/application-form', label: 'Application Form' },
    { path: '/academics/curriculum', label: 'Curriculum' },
    { path: '/student-life/hostel', label: 'Hostel Facilities' },
    { path: '/admissions/scholarships', label: 'Scholarships' },
    { path: '/careers', label: 'Career Opportunities' },
    { path: '/sitemap', label: 'Sitemap' },
  ];

  return (
    <footer className="footer bg-dark text-white">
      {/* Footer Top */}
      <div className="footer-top py-5">
        <Container>
          <Row className="g-4">
            {/* School Info */}
            <Col lg={4} md={6}>
              <div className="footer-brand mb-4">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/images/logo.jpeg"
                    alt="KATSS Logo"
                    height="60"
                    className="rounded-circle me-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/60x60/003366/ffffff?text=KATSS';
                    }}
                  />
                  <div>
                    <h3 className="h5 fw-bold mb-1">KATSS</h3>
                    <p className="small mb-0 text-light">Technical Excellence & Moral Values</p>
                  </div>
                </div>
                <p className="text-light mb-4">
                  Kirehe Adventist Technical Secondary School is committed to providing 
                  quality technical education integrated with Christian values for Rwanda's future leaders.
                </p>
                <div className="social-links d-flex gap-3">
                  <a href="https://facebook.com" className="social-link">
                    <FaFacebook />
                  </a>
                  <a href="https://youtube.com" className="social-link">
                    <FaYoutube />
                  </a>
                  <a href="https://twitter.com" className="social-link">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" className="social-link">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <h4 className="h5 fw-bold mb-4 border-bottom pb-2" style={{ borderColor: 'var(--color-primary-accent)' }}>
                Quick Links
              </h4>
              <ul className="list-unstyled">
                {quickLinks.slice(0, 4).map((link) => (
                  <li key={link.path} className="mb-2">
                    <Link to={link.path} className="footer-link">
                      <FaArrowRight className="me-2 small" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Resources */}
            <Col lg={2} md={6}>
              <h4 className="h5 fw-bold mb-4 border-bottom pb-2" style={{ borderColor: 'var(--color-primary-accent)' }}>
                Resources
              </h4>
              <ul className="list-unstyled">
                {resources.slice(0, 4).map((link) => (
                  <li key={link.path} className="mb-2">
                    <Link to={link.path} className="footer-link">
                      <FaArrowRight className="me-2 small" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Contact & Newsletter */}
            <Col lg={4} md={6}>
              <h4 className="h5 fw-bold mb-4 border-bottom pb-2" style={{ borderColor: 'var(--color-primary-accent)' }}>
                Stay Updated
              </h4>
              
              <div className="contact-info mb-4">
                <div className="d-flex align-items-start mb-3">
                  <FaMapMarkerAlt className="me-3 mt-1 text-primary-accent" />
                  <div>
                    <h6 className="mb-1">Our Location</h6>
                    <p className="small mb-0 text-light">
                      Kirehe District, Eastern Province<br />
                      Rwanda, 131km from Kigali
                    </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FaPhone className="me-3 mt-1 text-primary-accent" />
                  <div>
                    <h6 className="mb-1">Call Us</h6>
                    <p className="small mb-0 text-light">
                      <a href="tel:+250788416574" className="text-white text-decoration-none">
                        +250 788 416 574
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <FaEnvelope className="me-3 mt-1 text-primary-accent" />
                  <div>
                    <h6 className="mb-1">Email Us</h6>
                    <p className="small mb-0 text-light">
                      <a href="mailto:katsapapen@gmail.com" className="text-white text-decoration-none">
                        katsapapen@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>


            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom py-4 bg-darker">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0 small text-light">
                © {new Date().getFullYear()} Kirehe Adventist Technical Secondary School. 
                All rights reserved.
              </p>
            </Col>
            <Col md={6}>
              <div className="text-md-end">
                <Link to="/privacy-policy" className="text-light me-3 small">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-light me-3 small">
                  Terms of Use
                </Link>
                <Link to="/sitemap" className="text-light small">
                  Sitemap
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;