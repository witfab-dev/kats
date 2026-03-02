import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaYoutube, 
  FaTwitter, 
  FaInstagram, 
  FaPhone, 
  FaEnvelope,
  FaBars,
  FaHome,
  FaInfoCircle,
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaCalendarAlt,
  FaImages,
  FaHeadset,
  FaGraduationCap
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Head 1 - Top Bar with Social and Contact */}
      <section className="head1">
        <div className="quicklinks">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
        <div className="contact">
          <p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=katsapapen@gmail.com&su=Subject+Here&body=Hello+there!" target="_blank" rel="noopener noreferrer">
              <FaEnvelope /> katsapapen@gmail.com
            </a>
            &nbsp;&nbsp;
            <FaPhone /> +250 788416574
          </p>
        </div>
      </section>

      {/* Head 2 - Logo, School Name, Navigation */}
      <section className="head2">
        <div className="header-branding">
          <div className="logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img 
                src="/images/logo.jpeg" 
                alt="katss logo" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://placehold.co/60x60/003366/ffffff?text=LOGO';
                }} 
                loading="lazy"
              />
            </Link>
          </div>
          <div className="school_name">
            <h1>Kirehe adventist technical <br /> secondary school</h1>
          </div>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                data-page="home" 
                className={isActive('/') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                data-page="about"
                className={isActive('/about') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle /> About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/academics" 
                data-page="academics"
                className={isActive('/academics') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaBook /> Academics
              </Link>
            </li>
            <li>
              <Link 
                to="/programs" 
                data-page="programs"
                className={isActive('/programs') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaGraduationCap /> Programs
              </Link>
            </li>
            <li>
              <Link 
                to="/admissions" 
                data-page="admissions"
                className={isActive('/admissions') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaUserGraduate /> Admissions
              </Link>
            </li>
            <li>
              <Link 
                to="/student-life" 
                data-page="student-life"
                className={isActive('/student-life') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaUsers /> Student Life
              </Link>
            </li>
            <li>
              <Link 
                to="/news-events" 
                data-page="news-events-page"
                className={isActive('/news-events') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaCalendarAlt /> News & Events
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                data-page="gallery"
                className={isActive('/gallery') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaImages /> Gallery
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                data-page="contact"
                className={isActive('/contact') ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <FaHeadset /> Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </section>
    </header>
  );
};

export default Header;