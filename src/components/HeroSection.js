import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  ctaPrimary, 
  ctaSecondary,
  showVideo = false,
  align = 'center', // 'center', 'left', or 'right'
  showStats = true // Control whether to show the stats column
}) => {
  return (
    <section className="hero-section position-relative overflow-hidden">
      <div className="hero-background">
        <LazyLoadImage
          src={backgroundImage}
          alt="Hero Background"
          effect="blur"
          className="hero-bg-image"
          placeholderSrc="https://placehold.co/1920x800/003366/ffffff?text=KATSS"
        />
        <div className="hero-overlay" />
      </div>
      
      <Container className="position-relative z-2 py-6">
        <Row className={`align-items-center min-vh-70 ${
          align === 'left' ? 'justify-content-start' : 
          align === 'right' ? 'justify-content-end' : 
          'justify-content-center'
        }`}>
          <Col lg={showStats ? 7 : 12} className={`${
            align === 'left' ? 'text-start' : 
            align === 'right' ? 'text-end' : 
            'text-center text-lg-start'
          }`}>
            <h1 className="display-4 fw-bold text-white mb-4" data-aos="fade-up">
              {title}
            </h1>
            <p className="lead text-white mb-5 opacity-90" data-aos="fade-up" data-aos-delay="100">
              {subtitle}
            </p>
            
            <div className={`d-flex flex-wrap gap-3 ${
              align === 'left' ? 'justify-content-start' : 
              align === 'right' ? 'justify-content-end' : 
              'justify-content-center justify-content-lg-start'
            }`} data-aos="fade-up" data-aos-delay="200">
              {ctaPrimary && (
                <Button 
                  as={Link} 
                  to={ctaPrimary.link} 
                  variant="light" 
                  size="lg" 
                  className="px-4 py-3 fw-bold d-flex align-items-center"
                >
                  {ctaPrimary.text} <FaArrowRight className="ms-2" />
                </Button>
              )}
              
              {ctaSecondary && (
                <Button 
                  as={Link} 
                  to={ctaSecondary.link} 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3 fw-bold"
                >
                  {ctaSecondary.text}
                </Button>
              )}
              
              {showVideo && (
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  className="px-4 py-3 fw-bold d-flex align-items-center"
                  onClick={() => document.getElementById('hero-video-modal').showModal()}
                >
                  <FaPlayCircle className="me-2" /> Watch Video
                </Button>
              )}
            </div>
          </Col>
          
          {showStats && (
            <Col lg={5} className="mt-5 mt-lg-0" data-aos="fade-left">
              <div className="hero-stats bg-white rounded-3 p-4 shadow-lg">
                <h4 className="text-primary mb-4">Quick Facts</h4>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-2">
                      <h3 className="text-primary mb-0">1,200+</h3>
                      <small className="text-muted">Students</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-2">
                      <h3 className="text-primary mb-0">95%</h3>
                      <small className="text-muted">Success Rate</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-2">
                      <h3 className="text-primary mb-0">6</h3>
                      <small className="text-muted">Programs</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-center p-3 bg-light rounded-2">
                      <h3 className="text-primary mb-0">20+</h3>
                      <small className="text-muted">Years Experience</small>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      
      {/* Video Modal */}
      <dialog id="hero-video-modal" className="modal fade">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Welcome to KATSS</h5>
              <button type="button" className="btn-close" onClick={() => document.getElementById('hero-video-modal').close()} />
            </div>
            <div className="modal-body p-0">
              <video controls className="w-100" style={{ maxHeight: '70vh' }}>
                <source src="/videos/campus-tour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default HeroSection;