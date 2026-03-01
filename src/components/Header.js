import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaFacebook, FaYoutube, FaTwitter, FaInstagram, 
  FaPhone, FaEnvelope, FaBars, FaWhatsapp,
  FaSearch, FaUserGraduate
} from 'react-icons/fa';
import { BiSolidSchool } from 'react-icons/bi';
import './Header.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: <BiSolidSchool /> },
    { path: '/about', label: 'About Us', icon: <FaUserGraduate /> },
    { path: '/academics', label: 'Academics', icon: <FaUserGraduate /> },
    { path: '/programs', label: 'Programs', icon: <FaUserGraduate /> },
    { path: '/admissions', label: 'Admissions', icon: <FaUserGraduate /> },
    { path: '/student-life', label: 'Student Life', icon: <FaUserGraduate /> },
    { path: '/news-events', label: 'News & Events', icon: <FaUserGraduate /> },
    { path: '/gallery', label: 'Gallery', icon: <FaUserGraduate /> },
    { path: '/contact', label: 'Contact', icon: <FaUserGraduate /> },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement bg-primary text-white py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <small>
            🎓 <strong>Admissions Open for 2025-26</strong> - Apply before December 31st
          </small>
          <div className="d-none d-md-flex align-items-center gap-3">
            <a href="tel:+250788416574" className="text-white text-decoration-none">
              <FaPhone className="me-1" /> +250 788 416 574
            </a>
            <span className="text-white-50">|</span>
            <a href="mailto:katsapapen@gmail.com" className="text-white text-decoration-none">
              <FaEnvelope className="me-1" /> katsapapen@gmail.com
            </a>
          </div>
        </Container>
      </div>

      {/* Top Social Bar */}
      <div className="top-social bg-dark text-white py-1">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <span className="text-white-50">Follow us:</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaFacebook size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaYoutube size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaTwitter size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FaInstagram size={14} />
            </a>
          </div>
          <div className="d-none d-md-block">
            <small>📍 Kirehe District, Eastern Province, Rwanda</small>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`main-navbar ${scrolled ? 'scrolled' : ''}`}
        expanded={expanded}
      >
        <Container fluid className="px-md-5">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
            <div className="logo-wrapper">
              <img
                src="/images/logo.jpeg"
                alt="KATSS Logo"
                height="60"
                width="60"
                className="rounded-circle me-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/55x55/003366/ffffff?text=KATSS';
                }}
              />
            </div>
            <div className="brand-text d-flex flex-column">
              <h1 className="h5 fw-bold mb-0 text-primary">Kirehe Adventist</h1>
              <h2 className="h6 mb-0 text-secondary">Technical Secondary School</h2>
              <small className="text-muted fst-italic fw-bold motto-text">Success Demands Aim</small>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="navbar-nav" 
            onClick={() => setExpanded(!expanded)}
            className="border-0"
          >
            <FaBars />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center flex-wrap">
              {navLinks.map((link) => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={link.path}
                  active={location.pathname === link.path}
                  onClick={() => setExpanded(false)}
                  className="nav-link-custom px-2 px-md-3"
                >
                  <span className="nav-icon d-none d-lg-inline">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                </Nav.Link>
              ))}
            </Nav>
            
            {/* Mobile contact info */}
            <div className="d-lg-none mt-4 pt-3 border-top">
              <div className="text-center">
                <a href="tel:+250788416574" className="text-decoration-none d-block mb-2">
                  <FaPhone className="me-2" /> +250 788 416 574
                </a>
                <a href="mailto:katsapapen@gmail.com" className="text-decoration-none d-block">
                  <FaEnvelope className="me-2" /> katsapapen@gmail.com
                </a>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div style={{ height: scrolled ? '100px' : '120px' }} />
    </>
  );
};

export default Header;