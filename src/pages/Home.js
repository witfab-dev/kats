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

const Home = () => {
    useEffect(() => {
    // Track page view with proper error handling
    const trackHomePageView = async () => {
      try {
        // Check if trackPageView is available
        if (typeof trackPageView === 'function') {
          await trackPageView('/');
        } else {
          // Fallback: try dynamic import
          try {
            const analyticsModule = await import('../utils/analytics');
            if (analyticsModule.trackPageView && typeof analyticsModule.trackPageView === 'function') {
              await analyticsModule.trackPageView('/');
            }
          } catch (importError) {
            console.warn('Analytics module not found, using fallback:', importError);
            // Fallback tracking for development
            if (process.env.NODE_ENV === 'development') {
              console.log('📊 [DEV] Page View Tracked: /');
            }
          }
        }
      } catch (error) {
        console.error('Failed to track page view:', error);
        // Don't break the app if analytics fails
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
          content="Kirehe Adventist Technical Secondary School offers quality technical education with Christian values in Rwanda. Explore our programs in Software Development, Building Construction, Accounting, and more." 
        />
        <meta name="keywords" content="technical school Rwanda, Kirehe school, TVET Rwanda, Adventist education, technical training" />
        <link rel="canonical" href="https://katss.ac.rw" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection 
        title="Shaping Future Leaders Through Technical Excellence"
        subtitle="Kirehe Adventist Technical Secondary School combines academic rigor with hands-on technical training"
        backgroundImage="/images/images.jpeg"
        ctaPrimary={{ text: "Apply Now", link: "/apply" }}
        ctaSecondary={{ text: "Explore Programs", link: "/programs" }}
      />

      {/* Quick Stats */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Why Choose KATSS?</h2>
            <p className="text-muted lead mb-0">
              We provide quality education that transforms lives and builds careers
            </p>
          </div>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <StatsCard {...stat} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Programs */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Our Technical Programs</h2>
            <p className="text-muted lead mb-0">
              Industry-relevant skills for tomorrow's job market
            </p>
          </div>
          <Row className="g-4">
            {featuredPrograms.map((program, index) => (
              <Col lg={3} md={6} key={program.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <ProgramCard {...program} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5" data-aos="fade-up">
            <Button as={Link} to="/programs" variant="primary" size="lg" className="px-5">
              View All Programs <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} data-aos="fade-right">
              <div className="position-relative">
                <LazyLoadImage
                  src="/images/schoolcomp.jpg"
                  alt="KATSS Campus"
                  className="img-fluid rounded-3 shadow-lg"
                  effect="blur"
                  placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS+Campus"
                />
                <div className="position-absolute bottom-0 start-0 bg-primary text-white p-4 rounded-end">
                  <h4 className="mb-0">18+ Years</h4>
                  <p className="mb-0 small">Of Educational Excellence</p>
                </div>
              </div>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <h2 className="fw-bold text-primary mb-4">
                Transforming Education in Eastern Rwanda
              </h2>
              <p className="lead mb-4">
                Since 2004, KATSS has been at the forefront of technical education, 
                providing students with practical skills and moral values to succeed 
                in Rwanda's growing economy.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-3">
                  <FaAward className="text-primary me-3" />
                  <strong>Accredited Programs:</strong> All courses recognized by WDA
                </li>
                <li className="mb-3">
                  <GiTeacher className="text-primary me-3" />
                  <strong>Experienced Faculty:</strong> Industry professionals as instructors
                </li>
                <li className="mb-3">
                  <FaBookOpen className="text-primary me-3" />
                  <strong>Modern Facilities:</strong> State-of-the-art labs and workshops
                </li>
                <li>
                  <FaGraduationCap className="text-primary me-3" />
                  <strong>High Placement Rate:</strong> 95% employment after graduation
                </li>
              </ul>
              <Button as={Link} to="/about" variant="outline-primary" size="lg">
                Learn More About Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Latest News & Events */}
      <section className="section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-up">
            <div>
              <h2 className="fw-bold text-primary mb-2">Latest News & Events</h2>
              <p className="text-muted mb-0">Stay updated with school activities and announcements</p>
            </div>
            <Button as={Link} to="/news-events" variant="outline-primary">
              View All <FaArrowRight className="ms-2" />
            </Button>
          </div>
          <NewsSwiper />
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-primary text-white position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="pattern-dots" />
        </div>
        <Container className="position-relative">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-3">What Our Students Say</h2>
            <p className="lead opacity-75">
              Hear from our students about their experience at KATSS
            </p>
          </div>
          <Row className="g-4">
            {featuredTestimonials.map((testimonial, index) => (
              <Col lg={4} md={6} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <TestimonialCard {...testimonial} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-4">Ready to Start Your Journey?</h2>
            <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
              Join over 1,200 students who are shaping their future at KATSS. 
              Applications are now open for the 2025-26 academic year.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button 
                as={Link} 
                to="/apply" 
                variant="primary" 
                size="lg" 
                className="px-5 py-3 fw-bold"
              >
                Apply Now
              </Button>
              <Button 
                as={Link} 
                to="/contact" 
                variant="outline-primary" 
                size="lg" 
                className="px-5 py-3 fw-bold"
              >
                Schedule a Visit
              </Button>
              <Button 
                as={Link} 
                to="/downloads/prospectus" 
                variant="outline-secondary" 
                size="lg" 
                className="px-5 py-3 fw-bold"
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