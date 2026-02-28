// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Offcanvas } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaInfoCircle, 
  FaGraduationCap, 
  FaImages, 
  FaNewspaper,
  FaUserFriends,
  FaEnvelope,
  FaBars,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaSearch,
  FaChevronDown,
  FaCalendarAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { schoolInfo } from '../assets/data/constants';
import './Navigation.css';

const Navigation = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowOffcanvas(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setShowSearch(false);
  };

  const mainNavItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { 
      path: '/academics', 
      label: 'Academics', 
      icon: <FaGraduationCap />,
      dropdown: [
        { path: '/academics/programs', label: 'Academic Programs' },
        { path: '/academics/calendar', label: 'Academic Calendar' },
        { path: '/academics/faculty', label: 'Teaching Staff' },
        { path: '/academics/library', label: 'Library Services' }
      ]
    },
    { 
      path: '/admissions', 
      label: 'Admissions', 
      icon: <FaGraduationCap />,
      dropdown: [
        { path: '/admissions/requirements', label: 'Requirements' },
        { path: '/admissions/apply', label: 'Apply Online' },
        { path: '/admissions/fees', label: 'Fee Structure' },
        { path: '/admissions/scholarships', label: 'Scholarships' }
      ]
    },
    { path: '/gallery', label: 'Gallery', icon: <FaImages /> },
    { path: '/news-events', label: 'News & Events', icon: <FaNewspaper /> },
    { path: '/student-life', label: 'Student Life', icon: <FaUserFriends /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> }
  ];

  const quickLinks = [
    { path: '/portal', label: 'Student Portal', icon: '🎓' },
    { path: '/alumni', label: 'Alumni Network', icon: '👥' },
    { path: '/careers', label: 'Careers', icon: '💼' },
    { path: '/donate', label: 'Support KATSS', icon: '❤️' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar bg-primary text-white py-2 d-none d-lg-block">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2">
                <FaPhone size={14} />
                <a href={`tel:${schoolInfo.contact.phone}`} className="text-white text-decoration-none">
                  {schoolInfo.contact.phone}
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={14} />
                <span>{schoolInfo.contact.address}</span>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="social-links">
                <a href={schoolInfo.socialMedia.facebook} className="text-white" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href={schoolInfo.socialMedia.twitter} className="text-white mx-3" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href={schoolInfo.socialMedia.youtube} className="text-white me-3" aria-label="YouTube">
                  <FaYoutube />
                </a>
                <a href={schoolInfo.socialMedia.instagram} className="text-white" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
              
              <Button 
                variant="outline-light" 
                size="sm"
                as={Link}
                to="/apply"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar 
        expand="lg" 
        className={`main-navbar ${scrolled ? 'scrolled' : ''}`}
        fixed="top"
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="school-logo me-3">
              <div className="logo-initials">KATSS</div>
            </div>
            <div className="logo-text">
              <h1 className="school-name mb-0">{schoolInfo.shortName}</h1>
              <p className="school-motto mb-0">{schoolInfo.motto}</p>
            </div>
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex align-items-center">
            <Nav className="me-4">
              {mainNavItems.map((item) => (
                item.dropdown ? (
                  <Dropdown key={item.path} as={Nav.Item}>
                    <Dropdown.Toggle
                      as={Nav.Link}
                      className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                    >
                      {item.icon}
                      <span className="ms-2">{item.label}</span>
                      <FaChevronDown className="ms-1" size={12} />
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                      {item.dropdown.map((subItem) => (
                        <Dropdown.Item 
                          key={subItem.path}
                          as={Link}
                          to={subItem.path}
                        >
                          {subItem.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Nav.Link
                    key={item.path}
                    as={Link}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.icon}
                    <span className="ms-2">{item.label}</span>
                  </Nav.Link>
                )
              ))}
            </Nav>

            {/* Search Button */}
            <Button
              variant="link"
              className="text-dark search-btn"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search"
            >
              <FaSearch />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="link"
            className="d-lg-none mobile-toggle"
            onClick={() => setShowOffcanvas(true)}
            aria-label="Menu"
          >
            <FaBars size={24} />
          </Button>
        </Container>

        {/* Search Bar */}
        {showSearch && (
          <div className="search-overlay">
            <Container>
              <form onSubmit={handleSearch} className="search-form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for programs, news, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button type="submit" variant="primary">
                    <FaSearch />
                  </Button>
                </div>
              </form>
            </Container>
          </div>
        )}
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="mobile-nav-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="school-logo">
              <div className="logo-initials">KATSS</div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body>
          <Nav className="flex-column">
            {mainNavItems.map((item) => (
              <div key={item.path} className="mobile-nav-item">
                <Nav.Link
                  as={Link}
                  to={item.path}
                  className="mobile-nav-link"
                >
                  <div className="d-flex align-items-center">
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </div>
                </Nav.Link>
                
                {item.dropdown && (
                  <div className="mobile-submenu">
                    {item.dropdown.map((subItem) => (
                      <Nav.Link
                        key={subItem.path}
                        as={Link}
                        to={subItem.path}
                        className="mobile-submenu-link"
                      >
                        {subItem.label}
                      </Nav.Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Nav>

          <hr className="my-4" />

          {/* Quick Links */}
          <h6 className="text-uppercase mb-3">Quick Links</h6>
          <div className="quick-links-grid">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="quick-link"
              >
                <span className="quick-link-icon">{link.icon}</span>
                <span className="quick-link-label">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mobile-contact mt-5">
            <h6 className="text-uppercase mb-3">Contact Info</h6>
            <div className="contact-item">
              <FaPhone className="me-2" />
              <a href={`tel:${schoolInfo.contact.phone}`}>{schoolInfo.contact.phone}</a>
            </div>
            <div className="contact-item mt-2">
              <FaMapMarkerAlt className="me-2" />
              <span>{schoolInfo.contact.address}</span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Spacer for fixed navbar */}
      <div style={{ height: scrolled ? '80px' : '140px' }} />
    </>
  );
};

export default Navigation;