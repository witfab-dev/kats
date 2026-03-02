import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Nav, Accordion, Button, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle,
  FaBook, 
  FaCalendarAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardList,
  FaAward,
  FaRegClock,
  FaUsers,
  FaLaptop,
  FaFlask,
  FaTools,
  FaArrowRight,
  FaDownload
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import Breadcrumb from '../components/Breadcrumb';
import ProgramCard from '../components/ProgramCard';
import StatsCard from '../components/StatsCard';

// Data
import { programs } from '../assets/data/programs';
import { stats } from '../assets/data/constants';

const Academics = () => {
  useEffect(() => {
    // Track page view
    import('../utils/analytics').then(({ trackPageView }) => {
      trackPageView('/academics');
    });
  }, []);

  const academicLevels = [
    {
      level: 'Ordinary Level (S1 - S3)',
      description: 'Foundation phase focusing on core subjects and basic technical skills',
      subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'ICT Basics'],
      image: '/images/academics/ordinary-level.jpg',
      duration: '3 Years',
      outcome: 'Preparation for advanced studies'
    },
    {
      level: 'Advanced Level (S4 - S6)',
      description: 'Specialized tracks with technical orientation',
      subjects: ['Combination Sciences', 'Technical Drawing', 'Computer Science', 'Entrepreneurship'],
      image: '/images/academics/advanced-level.jpg',
      duration: '3 Years',
      outcome: 'University entrance preparation'
    },
    {
      level: 'TVET Programs (Level 4-5)',
      description: 'Professional technical training with industry certification',
      subjects: ['Practical Workshops', 'Industry Attachment', 'Project Work', 'Professional Ethics'],
      image: '/images/academics/tvet-programs.jpg',
      duration: '2-3 Years',
      outcome: 'Direct employment or advanced diplomas'
    }
  ];

  const curriculumFeatures = [
    {
      icon: <FaChalkboardTeacher />,
      title: 'Competency-Based Curriculum',
      description: 'Focus on practical skills and real-world applications',
      benefits: ['Industry-relevant skills', 'Hands-on training', 'Continuous assessment']
    },
    {
      icon: <FaChartLine />,
      title: 'Progressive Learning',
      description: 'Structured progression from basic to advanced competencies',
      benefits: ['Step-by-step skill development', 'Regular evaluations', 'Personalized learning paths']
    },
    {
      icon: <FaClipboardList />,
      title: 'Continuous Assessment',
      description: 'Regular evaluation through practical and theoretical tests',
      benefits: ['Formative assessment', 'Skill certification', 'Progress tracking']
    },
    {
      icon: <FaAward />,
      title: 'Industry Certification',
      description: 'Recognition by Rwanda Workforce Development Authority (WDA)',
      benefits: ['Nationally recognized', 'Industry-valued', 'International equivalency']
    }
  ];

  const facilities = [
    {
      name: 'Computer Labs',
      description: 'Modern computer labs with latest software and high-speed internet',
      icon: <FaLaptop />,
      capacity: '50 students per session',
      image: '/images/facilities/computer-lab.jpg'
    },
    {
      name: 'Science Laboratories',
      description: 'Fully equipped labs for physics, chemistry, and biology experiments',
      icon: <FaFlask />,
      capacity: '40 students per session',
      image: '/images/facilities/science-lab.jpg'
    },
    {
      name: 'Technical Workshops',
      description: 'Specialized workshops for each technical program',
      icon: <FaTools />,
      capacity: '30 students per workshop',
      image: '/images/facilities/workshop.jpg'
    },
    {
      name: 'Library & Resource Center',
      description: 'Digital and physical resources for research and study',
      icon: <FaBook />,
      capacity: '100 students',
      image: '/images/facilities/library.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Academics - KATSS Technical Education Programs</title>
        <meta 
          name="description" 
          content="Explore KATSS academic programs, curriculum, facilities, and teaching methodology for technical education in Rwanda." 
        />
        <meta name="keywords" content="academics, curriculum, technical education, TVET, programs, facilities" />
      </Helmet>

      {/* Hero Section */}
      <section className="academics-hero section-padding bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-5 fw-bold mb-4" style={{ color: "white" }}>
                Academic Excellence in Technical Education
              </h1>
              <p className="lead opacity-75 mb-5">
                At KATSS, we combine theoretical knowledge with practical skills 
                to prepare students for successful careers in Rwanda's growing economy.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/programs" variant="light" size="lg">
                  <FaArrowRight className="me-2" />
                  Explore Programs
                </Button>

              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0">
              <div className="stats-grid">
                <Row className="g-3">
                  {stats.slice(0, 4).map((stat, index) => (
                    <Col sm={6} key={index}>
                      <StatsCard {...stat} className="bg-white text-dark" />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
<br/>
<br/>
      {/* Academic Levels */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Academic Structure</h2>
            <p className="lead text-muted">
              Our comprehensive educational pathway from foundation to specialization
            </p>
          </div>

          <Row className="g-4">
            {academicLevels.map((level, index) => (
              <Col lg={4} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <div className="level-image-container">
                    <LazyLoadImage
                      src={level.image}
                      alt={level.level}
                      effect="blur"
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                      placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS"
                    />
                    <div className="level-badge">
                      <Badge bg="primary" className="px-3 py-2">
                        {level.duration}
                      </Badge>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <Card.Title as="h4" className="fw-bold mb-3">
                      {level.level}
                    </Card.Title>
                    <Card.Text className="text-muted mb-4">
                      {level.description}
                    </Card.Text>
                    
                    <div className="subjects-list mb-4">
                      <h6 className="fw-semibold mb-3">
                        <FaBook className="me-2 text-primary" />
                        Key Subjects
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {level.subjects.map((subject, idx) => (
                          <Badge key={idx} bg="light" text="dark" className="fw-normal">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="outcome-info p-3 bg-light rounded">
                      <h6 className="fw-semibold mb-2">Learning Outcome</h6>
                      <p className="mb-0 small text-muted">{level.outcome}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Curriculum Features */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Our Curriculum Approach</h2>
            <p className="lead text-muted">
              Designed to develop competent professionals ready for the job market
            </p>
          </div>

          <Row className="g-4">
            {curriculumFeatures.map((feature, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4 text-center">
                    <div className="feature-icon mb-4">
                      <div className="icon-circle bg-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                        <span className="text-white" style={{ fontSize: '2rem' }}>
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                    <Card.Title as="h5" className="fw-bold mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-4">
                      {feature.description}
                    </Card.Text>
                    <div className="benefits-list">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="benefit-item d-flex align-items-center mb-2">
                          <FaCheckCircle className="text-success me-2 small" />
                          <span className="small">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Technical Programs */}
      <section className="section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <h2 className="fw-bold text-primary mb-2">Technical & Vocational Programs</h2>
              <p className="text-muted mb-0">
                Industry-focused training for immediate employability
              </p>
            </div>
            <Button as={Link} to="/programs" variant="outline-primary">
              View All Programs <FaArrowRight className="ms-2" />
            </Button>
          </div>

          <Row className="g-4">
            {programs.slice(0, 6).map((program) => (
              <Col lg={4} md={6} key={program.id}>
                <ProgramCard {...program} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">State-of-the-Art Facilities</h2>
            <p className="lead text-muted">
              Modern infrastructure supporting practical learning
            </p>
          </div>

          <Tab.Container defaultActiveKey="computer-labs">
            <div className="facilities-tabs">
              <Nav variant="tabs" className="mb-4 justify-content-center">
                {facilities.map((facility, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link 
                      eventKey={facility.name.toLowerCase().replace(' ', '-')}
                      className="d-flex align-items-center"
                    >
                      <span className="me-2">{facility.icon}</span>
                      {facility.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              
              <Tab.Content>
                {facilities.map((facility, index) => (
                  <Tab.Pane key={index} eventKey={facility.name.toLowerCase().replace(' ', '-')}>
                    <Row className="align-items-center g-4">
                      <Col lg={6}>
                        <LazyLoadImage
                          src={facility.image}
                          alt={facility.name}
                          effect="blur"
                          className="img-fluid rounded shadow"
                          placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=Facility"
                        />
                      </Col>
                      <Col lg={6}>
                        <h3 className="fw-bold mb-3">{facility.name}</h3>
                        <p className="text-muted mb-4">{facility.description}</p>
                        <div className="facility-details">
                          <div className="detail-item d-flex align-items-center mb-3">
                            <FaUsers className="text-primary me-3" />
                            <div>
                              <h6 className="fw-semibold mb-1">Capacity</h6>
                              <p className="mb-0">{facility.capacity}</p>
                            </div>
                          </div>
                          <div className="detail-item d-flex align-items-center">
                            <FaRegClock className="text-primary me-3" />
                            <div>
                              <h6 className="fw-semibold mb-1">Availability</h6>
                              <p className="mb-0">Monday - Friday, 8:00 AM - 5:00 PM</p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </div>
          </Tab.Container>
        </Container>
      </section>

      {/* Academic Calendar */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold text-primary mb-3">Academic Calendar 2025-26</h2>
              <p className="text-muted mb-4">
                Stay informed about important dates, holidays, and academic events
              </p>
              
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FaCalendarAlt className="me-3 text-primary" />
                    Term 1: January - March 2025
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled">
                      <li className="mb-2">• Jan 13: School Opening</li>
                      <li className="mb-2">• Feb 15-20: Mid-term Tests</li>
                      <li className="mb-2">• Mar 25-30: End of Term Exams</li>
                      <li className="mb-0">• Apr 1-14: Term Break</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <FaCalendarAlt className="me-3 text-primary" />
                    Term 2: April - July 2025
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled">
                      <li className="mb-2">• Apr 15: Term 2 Begins</li>
                      <li className="mb-2">• May 20-25: Sports Day</li>
                      <li className="mb-2">• Jun 15-20: Science Fair</li>
                      <li className="mb-0">• Jul 20-25: End of Term Exams</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <FaCalendarAlt className="me-3 text-primary" />
                    Term 3: August - November 2025
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled">
                      <li className="mb-2">• Aug 12: Term 3 Begins</li>
                      <li className="mb-2">• Sep 10-15: Career Fair</li>
                      <li className="mb-2">• Oct 20-25: Graduation Preparation</li>
                      <li className="mb-0">• Nov 25: Graduation Ceremony</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Col>
            
            <Col lg={6} className="mt-5 mt-lg-0">
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-5">
                  <h3 className="fw-bold text-primary mb-4">
                    <FaUserGraduate className="me-3" />
                    Student Support Services
                  </h3>
                  
                  <div className="support-services">
                    <div className="service-item d-flex align-items-start mb-4">
                      <div className="service-icon bg-primary rounded-circle p-2 me-3">
                        <FaChalkboardTeacher className="text-white" />
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Academic Counseling</h5>
                        <p className="text-muted mb-0">
                          Personalized guidance for course selection and career planning
                        </p>
                      </div>
                    </div>
                    
                    <div className="service-item d-flex align-items-start mb-4">
                      <div className="service-icon bg-primary rounded-circle p-2 me-3">
                        <FaClipboardList className="text-white" />
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Tutoring Programs</h5>
                        <p className="text-muted mb-0">
                          Extra help in challenging subjects from qualified tutors
                        </p>
                      </div>
                    </div>
                    
                    <div className="service-item d-flex align-items-start">
                      <div className="service-icon bg-primary rounded-circle p-2 me-3">
                        <FaChartLine className="text-white" />
                      </div>
                      <div>
                        <h5 className="fw-semibold mb-2">Progress Tracking</h5>
                        <p className="text-muted mb-0">
                          Regular assessment and feedback for continuous improvement
                        </p>
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

    </>
  );
};

export default Academics;