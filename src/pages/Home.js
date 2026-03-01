import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FaArrowRight, FaCalendarAlt, FaUsers, FaGraduationCap, 
  FaToolbox, FaChalkboardTeacher, FaAward, FaBookOpen
} from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Components
import HeroSection from '../components/HeroSection';
import SwiperCarousel from '../components/SwiperCarousel';
import NewsSwiper from '../components/NewsSwiper';
import ProgramCard from '../components/ProgramCard';
import StatsCard from '../components/StatsCard';
import TestimonialCard from '../components/TestimonialCard';

// Data
import { programs } from '../assets/data/programs';
import { testimonials } from '../assets/data/testimonials';
import { stats } from '../assets/data/constants';
import { trackPageView } from '../utils/analytics';
import './Home.css'; // Create this CSS file for home-specific styles

const Home = () => {
  useEffect(() => {
    const trackHomePageView = async () => {
      try {
        if (typeof trackPageView === 'function') {
          await trackPageView('/');
        } else {
          try {
            const analyticsModule = await import('../utils/analytics');
            if (analyticsModule.trackPageView) {
              await analyticsModule.trackPageView('/');
            }
          } catch (importError) {
            if (process.env.NODE_ENV === 'development') {
              console.log('📊 [DEV] Page View Tracked: /');
            }
          }
        }
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackHomePageView();
  }, []);

  const featuredPrograms = programs.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>KATSS - Kirehe Adventist Technical Secondary School</title>
        <meta 
          name="description" 
          content="Kirehe Adventist Technical Secondary School offers quality technical education with Christian values in Rwanda." 
        />
        <meta name="keywords" content="technical school Rwanda, Kirehe school, TVET Rwanda" />
        <link rel="canonical" href="https://katss.ac.rw" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection 
        title="Shaping Future Leaders Through Technical Excellence"
        subtitle="Kirehe Adventist Technical Secondary School combines academic rigor with hands-on technical training"
        backgroundImage="/images/schoolcomp.jpg"
        ctaSecondary={{ text: "Explore Programs", link: "/programs" }}
      />

      {/* Quick Stats */}
      <section className="section-padding stats-section">
        <Container>
          <div className="section-header text-center mb-5" data-aos="fade-up">
            <h2 className="section-title">Why Choose KATSS?</h2>
            <p className="section-subtitle">
              We provide quality education that transforms lives and builds careers
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            {stats.map((stat, index) => (
              <Col xl={3} lg={3} md={6} sm={6} xs={12} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <StatsCard {...stat} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Programs */}
      <section className="section-padding programs-section">
        <Container>
          <div className="section-header text-center mb-5" data-aos="fade-up">
            <h2 className="section-title">Our Technical Programs</h2>
            <p className="section-subtitle">
              Industry-relevant skills for tomorrow's job market
            </p>
          </div>
          <Row className="g-4">
            {featuredPrograms.map((program, index) => (
              <Col xl={3} lg={3} md={6} sm={6} xs={12} key={program.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <ProgramCard {...program} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5" data-aos="fade-up">
            <Button as={Link} to="/programs" variant="primary" size="lg" className="px-5 view-all-btn">
              View All Programs <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* About Preview with Improved Image */}
      <section className="section-padding about-preview-section bg-light">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} md={12} data-aos="fade-right">
              <div className="about-image-wrapper position-relative">
                <div className="image-container">
                  <LazyLoadImage
                    src="/images/schoolcomp.jpg"
                    alt="KATSS Campus"
                    className="about-image img-fluid"
                    effect="blur"
                    wrapperClassName="about-image-wrapper"
                    placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS+Campus"
                  />
                </div>
                <div className="experience-badge">
                  <span className="years">18+</span>
                  <span className="text">Years of Excellence</span>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12} data-aos="fade-left">
              <div className="about-content">
                <h2 className="about-title">
                  Transforming Education in Eastern Rwanda
                </h2>
                <p className="about-description">
                  Since 2004, KATSS has been at the forefront of technical education, 
                  providing students with practical skills and moral values to succeed 
                  in Rwanda's growing economy.
                </p>
                <ul className="about-features">
                  <li className="feature-item">
                    <FaAward className="feature-icon" />
                    <div className="feature-text">
                      <strong>Accredited Programs:</strong> All courses recognized by WDA
                    </div>
                  </li>
                  <li className="feature-item">
                    <GiTeacher className="feature-icon" />
                    <div className="feature-text">
                      <strong>Experienced Faculty:</strong> Industry professionals as instructors
                    </div>
                  </li>
                  <li className="feature-item">
                    <FaBookOpen className="feature-icon" />
                    <div className="feature-text">
                      <strong>Modern Facilities:</strong> State-of-the-art labs and workshops
                    </div>
                  </li>
                  <li className="feature-item">
                    <FaGraduationCap className="feature-icon" />
                    <div className="feature-text">
                      <strong>High Placement Rate:</strong> 95% employment after graduation
                    </div>
                  </li>
                </ul>
                <Button as={Link} to="/about" variant="outline-primary" size="lg" className="learn-more-btn">
                  Learn More About Us <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest News & Events */}
      <section className="section-padding news-section">
        <Container>
          <div className="section-header d-flex justify-content-between align-items-center mb-5" data-aos="fade-up">
            <div>
              <h2 className="section-title mb-2">Latest News & Events</h2>
              <p className="section-subtitle mb-0">Stay updated with school activities and announcements</p>
            </div>
            <Button as={Link} to="/news-events" variant="outline-primary" className="view-all-news-btn d-none d-md-flex">
              View All <FaArrowRight className="ms-2" />
            </Button>
          </div>
          <NewsSwiper />
          <div className="text-center mt-4 d-md-none">
            <Button as={Link} to="/news-events" variant="outline-primary" className="view-all-news-btn">
              View All News <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding testimonials-section bg-primary text-white position-relative">
        <div className="pattern-overlay"></div>
        <Container className="position-relative">
          <div className="section-header text-center mb-5" data-aos="fade-up">
            <h2 className="section-title text-white">What Our Students Say</h2>
            <p className="section-subtitle text-white-50">
              Hear from our students about their experience at KATSS
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            {featuredTestimonials.map((testimonial, index) => (
              <Col xl={4} lg={4} md={6} sm={12} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <TestimonialCard {...testimonial} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section section-padding">
        <Container>
          <div className="cta-content text-center" data-aos="fade-up">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Join over 1,200 students who are shaping their future at KATSS. 
              Applications are now open for the 2025-26 academic year.
            </p>
            <div className="cta-buttons">
              <Button 
                as={Link} 
                to="/apply" 
                variant="primary" 
                size="lg" 
                className="cta-btn primary"
              >
                Apply Now
              </Button>
              <Button 
                as={Link} 
                to="/contact" 
                variant="outline-primary" 
                size="lg" 
                className="cta-btn outline"
              >
                Schedule a Visit
              </Button>
              <Button 
                as={Link} 
                to="/downloads/prospectus" 
                variant="outline-secondary" 
                size="lg" 
                className="cta-btn outline-secondary"
              >
                Download Prospectus
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;