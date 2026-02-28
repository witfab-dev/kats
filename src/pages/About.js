import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card, Tab, Nav, Accordion } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaHistory, 
  FaEye, 
  FaBullseye, 
  FaStar, 
  FaUsers, 
  FaAward,
  FaChartLine,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaCheckCircle,
  FaGraduationCap,
  FaHandshake,
  FaHeart
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Components
import Breadcrumb from '../components/Breadcrumb';
import StatsCard from '../components/StatsCard';
import HeroSection from '../components/HeroSection';

// Data
import { leadershipTeam, teachingStaff, administrativeStaff, supportStaff } from '../assets/data/staff';
import { stats } from '../assets/data/constants';

const About = () => {
  useEffect(() => {
    // Track page view
    import('../utils/analytics').then(({ trackPageView }) => {
      trackPageView('/about');
    });
  }, []);

  const coreValues = [
    { 
      icon: <FaCheckCircle />, 
      title: 'Integrity', 
      description: 'Upholding honesty and ethical standards in all our actions'
    },
    { 
      icon: <FaAward />, 
      title: 'Excellence', 
      description: 'Striving for the highest quality in education and service'
    },
    { 
      icon: <FaHeart />, 
      title: 'Service', 
      description: 'Serving our community with compassion and dedication'
    },
    { 
      icon: <FaChartLine />, 
      title: 'Innovation', 
      description: 'Embracing creativity and modern approaches to education'
    },
    { 
      icon: <FaHandshake />, 
      title: 'Collaboration', 
      description: 'Working together for shared success and growth'
    },
    { 
      icon: <FaGraduationCap />, 
      title: 'Lifelong Learning', 
      description: 'Fostering continuous personal and professional development'
    }
  ];

  const milestones = [
    { year: '2004', title: 'School Foundation', description: 'KATSS established in Kirehe District' },
    { year: '2008', title: 'First Graduation', description: 'First batch of 50 students graduated' },
    { year: '2012', title: 'TVET Accreditation', description: 'Received official TVET accreditation' },
    { year: '2015', title: 'Campus Expansion', description: 'New buildings and facilities added' },
    { year: '2018', title: '6 Programs Offered', description: 'Expanded to current 6 technical programs' },
    { year: '2022', title: '1,000+ Students', description: 'Reached enrollment milestone of 1,000 students' },
    { year: '2024', title: '20th Anniversary', description: 'Celebrating 20 years of educational excellence' }
  ];

const allStaff = [...leadershipTeam, ...teachingStaff, ...administrativeStaff, ...supportStaff];
  return (
    <>
      <Helmet>
        <title>About KATSS - Kirehe Adventist Technical Secondary School</title>
        <meta 
          name="description" 
          content="Learn about KATSS history, mission, vision, core values, leadership team, and our commitment to technical education in Rwanda." 
        />
        <meta name="keywords" content="about katss, school history, mission vision, leadership team, core values" />
      </Helmet>

      <Breadcrumb 
        customItems={[
          { path: '/about', name: 'About Us', icon: <FaUsers />, active: true }
        ]}
      />

      {/* Hero Section */}
      <HeroSection 
        title="About KATSS"
        subtitle="20+ Years of Educational Excellence in Eastern Rwanda"
        backgroundImage="/images/schoolcomp.jpg"
        ctaPrimary={{ text: "Meet Our Team", link: "#leadership" }}
        ctaSecondary={{ text: "View Programs", link: "/programs" }}
      />

      {/* Mission & Vision */}
      <section className="section-padding">
        <Container>
          <Row className="g-5">
            <Col lg={4}>
              <div className="text-center text-lg-start mb-5 mb-lg-0">
                <h2 className="fw-bold text-primary mb-4">
                  Our Guiding Principles
                </h2>
                <p className="lead text-muted">
                  Since 2004, we've been committed to transforming lives through 
                  quality technical education integrated with Christian values.
                </p>
                <Button as={Link} to="/contact" variant="outline-primary" className="mt-3">
                  <FaPhone className="me-2" />
                  Contact Us
                </Button>
              </div>
            </Col>

            <Col lg={8}>
              <Row className="g-4">
                <Col md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div className="icon-wrapper bg-primary rounded-circle p-3 mb-4 d-inline-flex">
                        <FaBullseye size={24} className="text-white" />
                      </div>
                      <Card.Title as="h4" className="fw-bold mb-3">
                        Our Mission
                      </Card.Title>
                      <Card.Text className="text-muted">
                        To provide quality technical and vocational education that 
                        equips students with practical skills, Christian values, 
                        and entrepreneurial mindset for sustainable development 
                        and global competitiveness.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <div className="icon-wrapper bg-primary rounded-circle p-3 mb-4 d-inline-flex">
                        <FaEye size={24} className="text-white" />
                      </div>
                      <Card.Title as="h4" className="fw-bold mb-3">
                        Our Vision
                      </Card.Title>
                      <Card.Text className="text-muted">
                        To be the leading center of excellence in technical education 
                        in Rwanda, producing innovative, ethical, and globally 
                        competitive professionals who contribute to national 
                        development.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Our Core Values</h2>
            <p className="lead text-muted">
              The principles that guide everything we do at KATSS
            </p>
          </div>

          <Row className="g-4">
            {coreValues.map((value, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <Card.Body className="p-4 text-center">
                    <div className="value-icon mb-4">
                      <div className="icon-circle bg-soft-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                           style={{ width: '80px', height: '80px' }}>
                        <span className="text-primary" style={{ fontSize: '2rem' }}>
                          {value.icon}
                        </span>
                      </div>
                    </div>
                    <Card.Title as="h5" className="fw-bold mb-3">
                      {value.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* History Timeline */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Our Journey</h2>
            <p className="lead text-muted">
              Milestones that shaped our growth and success
            </p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="timeline-content">
                    <div className="timeline-year">
                      <span className="year-badge bg-primary text-white">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="timeline-card">
                      <h5 className="fw-bold mb-2">{milestone.title}</h5>
                      <p className="text-muted mb-0">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-primary text-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">KATSS by Numbers</h2>
            <p className="lead opacity-75">
              Facts and figures that showcase our impact
            </p>
          </div>
          
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index}>
                <StatsCard 
                  {...stat}
                  className="bg-white text-dark"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Leadership Team</h2>
            <p className="lead text-muted">
              Meet the dedicated professionals guiding KATSS
            </p>
          </div>

          <Row className="g-4">
            {leadershipTeam.map((member, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <Card.Body className="p-4 text-center">
                    <div className="member-avatar mb-4">
                      <LazyLoadImage
                        src={member.image}
                        alt={member.name}
                        effect="blur"
                        className="rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        placeholderSrc="https://placehold.co/120x120/003366/ffffff?text=Staff"
                      />
                    </div>
                    <Card.Title as="h5" className="fw-bold mb-2">
                      {member.name}
                    </Card.Title>
                    <p className="text-primary fw-semibold mb-3">{member.position}</p>
                    <Card.Text className="text-muted small mb-4">
                      {member.bio}
                    </Card.Text>
                    <div className="member-contact">
                      <p className="small text-muted mb-1">
                        <FaPhone className="me-2" />
                        {member.phone}
                      </p>
                      <p className="small text-muted mb-0">
                        <FaEnvelope className="me-2" />
                        {member.email}
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Accreditation & Partnerships */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Accreditation & Partners</h2>
            <p className="lead text-muted">
              Recognized by leading educational bodies and industry partners
            </p>
          </div>

          <Row className="g-4 align-items-center">
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Official Recognition</h5>
                  <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="text-success me-3 mt-1" />
                      <div>
                        <strong>WDA Accredited</strong>
                        <p className="small text-muted mb-0">
                          Rwanda Workforce Development Authority
                        </p>
                      </div>
                    </li>
                    <li className="mb-3 d-flex align-items-start">
                      <FaCheckCircle className="text-success me-3 mt-1" />
                      <div>
                        <strong>MINEDUC Registered</strong>
                        <p className="small text-muted mb-0">
                          Ministry of Education, Rwanda
                        </p>
                      </div>
                    </li>
                    <li className="mb-0 d-flex align-items-start">
                      <FaCheckCircle className="text-success me-3 mt-1" />
                      <div>
                        <strong>Adventist Education Network</strong>
                        <p className="small text-muted mb-0">
                          Global Adventist education standards
                        </p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Industry Partnerships</h5>
                  <p className="text-muted mb-4">
                    We collaborate with leading companies to provide students with 
                    real-world experience and employment opportunities.
                  </p>
                  <div className="partners-grid">
                    <div className="partner-logo">
                      <div className="logo-placeholder bg-light rounded p-3 text-center">
                        <span className="text-primary fw-bold">Industry Partner 1</span>
                      </div>
                    </div>
                    <div className="partner-logo">
                      <div className="logo-placeholder bg-light rounded p-3 text-center">
                        <span className="text-primary fw-bold">Industry Partner 2</span>
                      </div>
                    </div>
                    <div className="partner-logo">
                      <div className="logo-placeholder bg-light rounded p-3 text-center">
                        <span className="text-primary fw-bold">Industry Partner 3</span>
                      </div>
                    </div>
                    <div className="partner-logo">
                      <div className="logo-placeholder bg-light rounded p-3 text-center">
                        <span className="text-primary fw-bold">Industry Partner 4</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Want to Learn More?</h2>
              <p className="lead opacity-75 mb-0">
                Schedule a campus visit or download our prospectus for detailed information.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <div className="d-flex flex-column flex-lg-row gap-3">
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="light" 
                  size="lg"
                  className="fw-semibold"
                >
                  <FaCalendarAlt className="me-2" />
                  Schedule Visit
                </Button>
                <Button 
                  as={Link} 
                  to="/downloads/prospectus" 
                  variant="outline-light" 
                  size="lg"
                  className="fw-semibold"
                >
                  <FaArrowRight className="me-2" />
                  Get Prospectus
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;