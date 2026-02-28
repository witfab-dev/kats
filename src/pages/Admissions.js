import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Tab, Nav, Badge, ProgressBar, Accordion } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock,
  FaMoneyBillWave,
  FaUserGraduate,
  FaQuestionCircle,
  FaDownload,
  FaPrint,
  FaShare,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaExclamationTriangle,
  FaRegCalendarCheck
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Countdown from 'react-countdown';

// Components
import Breadcrumb from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('requirements');
  const [showDeadlineAlert, setShowDeadlineAlert] = useState(true);
  const [applicationProgress, setApplicationProgress] = useState({
    started: false,
    stepsCompleted: 0,
    totalSteps: 5
  });

  useEffect(() => {
    // Track page view
    import('../utils/analytics').then(({ trackPageView }) => {
      trackPageView('/admissions');
    });
  }, []);

  const admissionDeadline = new Date('2025-12-31T23:59:59');
  
  const admissionSteps = [
    {
      step: 1,
      title: 'Inquiry & Information',
      description: 'Learn about programs and requirements',
      icon: <FaQuestionCircle />,
      duration: '1-2 days',
      status: 'completed'
    },
    {
      step: 2,
      title: 'Application Submission',
      description: 'Complete and submit application form',
      icon: <FaFileAlt />,
      duration: '2-3 days',
      status: 'current'
    },
    {
      step: 3,
      title: 'Document Verification',
      description: 'Submit required documents',
      icon: <FaCheckCircle />,
      duration: '3-5 days',
      status: 'pending'
    },
    {
      step: 4,
      title: 'Entrance Examination',
      description: 'Take the admission test',
      icon: <FaUserGraduate />,
      duration: '1 day',
      status: 'pending'
    },
    {
      step: 5,
      title: 'Interview & Selection',
      description: 'Final interview and admission decision',
      icon: <FaRegCalendarCheck />,
      duration: '3-5 days',
      status: 'pending'
    }
  ];

  const requirements = [
    {
      program: 'All Programs',
      items: [
        'Completed application form',
        'Copy of National ID/Passport',
        '4 recent passport-size photos',
        'Application fee payment receipt',
        'Medical certificate'
      ]
    },
    {
      program: 'Ordinary Level (S1)',
      items: [
        'Primary School Leaving Certificate',
        'Birth Certificate',
        'Recommendation letter from previous school',
        'Academic transcripts'
      ]
    },
    {
      program: 'Advanced Level (S4)',
      items: [
        'O-Level Certificate',
        'Subject combinations certificate',
        'Minimum grade requirements met',
        'Transfer letter (if applicable)'
      ]
    },
    {
      program: 'TVET Programs',
      items: [
        'O-Level Certificate',
        'Specific subject prerequisites',
        'Mathematics and English proficiency',
        'Entrance examination pass'
      ]
    }
  ];

  const feeStructure = [
    {
      program: 'Software Development',
      tuition: '300,000 RWF',
      registration: '50,000 RWF',
      total: '350,000 RWF',
      installment: '3 installments'
    },
    {
      program: 'Building Construction',
      tuition: '280,000 RWF',
      registration: '50,000 RWF',
      total: '330,000 RWF',
      installment: '3 installments'
    },
    {
      program: 'Accounting',
      tuition: '250,000 RWF',
      registration: '50,000 RWF',
      total: '300,000 RWF',
      installment: '3 installments'
    },
    {
      program: 'Automobile Technology',
      tuition: '320,000 RWF',
      registration: '50,000 RWF',
      total: '370,000 RWF',
      installment: '3 installments'
    },
    {
      program: 'Tourism & Hospitality',
      tuition: '240,000 RWF',
      registration: '50,000 RWF',
      total: '290,000 RWF',
      installment: '3 installments'
    },
    {
      program: 'Multimedia Production',
      tuition: '270,000 RWF',
      registration: '50,000 RWF',
      total: '320,000 RWF',
      installment: '3 installments'
    }
  ];

  const scholarships = [
    {
      name: 'Academic Excellence Scholarship',
      coverage: '100% tuition',
      requirements: ['Top 5% in national exams', 'Excellent academic record'],
      deadline: '2025-10-31',
      slots: '10'
    },
    {
      name: 'Sports & Arts Talent Scholarship',
      coverage: '50-75% tuition',
      requirements: ['Proven talent in sports/arts', 'District/National level achievements'],
      deadline: '2025-11-15',
      slots: '15'
    },
    {
      name: 'Need-Based Financial Aid',
      coverage: '25-50% tuition',
      requirements: ['Proof of financial need', 'Good academic standing'],
      deadline: '2025-11-30',
      slots: '25'
    },
    {
      name: 'Community Leadership Scholarship',
      coverage: '30% tuition',
      requirements: ['Community service record', 'Leadership experience'],
      deadline: '2025-12-15',
      slots: '20'
    }
  ];

  const handleStartApplication = () => {
    setApplicationProgress({
      started: true,
      stepsCompleted: 1,
      totalSteps: 5
    });
    // Navigate to application page
    window.location.href = '/apply';
  };

  const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-danger fw-bold">Application Closed</span>;
    }
    return (
      <div className="countdown-timer">
        <div className="timer-section">
          <div className="timer-value">{days}</div>
          <div className="timer-label">Days</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-section">
          <div className="timer-value">{hours}</div>
          <div className="timer-label">Hours</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-section">
          <div className="timer-value">{minutes}</div>
          <div className="timer-label">Minutes</div>
        </div>
        <div className="timer-separator">:</div>
        <div className="timer-section">
          <div className="timer-value">{seconds}</div>
          <div className="timer-label">Seconds</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Admissions - Apply to KATSS Technical Programs</title>
        <meta 
          name="description" 
          content="Admissions information for KATSS including requirements, application process, deadlines, fee structure, and scholarships for 2025-26 academic year." 
        />
        <meta name="keywords" content="admissions, apply, requirements, fees, scholarships, application process, deadlines" />
      </Helmet>

      <Breadcrumb 
        customItems={[
          { 
            path: '/admissions', 
            name: 'Admissions', 
            icon: <FaUserGraduate />, 
            active: true,
            actions: [
              {
                label: 'Apply Now',
                href: '/apply',
                variant: 'primary',
                icon: <FaFileAlt />
              },
              {
                label: 'Download Form',
                href: '/downloads/application-form.pdf',
                variant: 'outline-primary',
                icon: <FaDownload />
              }
            ]
          }
        ]}
      />

      {/* Deadline Alert */}
      {showDeadlineAlert && (
        <div className="deadline-alert bg-primary text-white">
          <Container>
            <Alert 
              variant="primary" 
              className="border-0 bg-transparent text-white mb-0 py-3"
              onClose={() => setShowDeadlineAlert(false)} 
              dismissible
            >
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="d-flex align-items-center mb-3 mb-md-0">
                  <FaExclamationTriangle className="me-3" size={24} />
                  <div>
                    <h5 className="alert-heading mb-1">2025-26 Admissions Open!</h5>
                    <p className="mb-0">
                      Applications close in: <Countdown date={admissionDeadline} renderer={CountdownRenderer} />
                    </p>
                  </div>
                </div>
                <Button 
                  variant="light" 
                  size="sm"
                  onClick={handleStartApplication}
                  className="fw-semibold"
                >
                  <FaArrowRight className="me-2" />
                  Start Application
                </Button>
              </div>
            </Alert>
          </Container>
        </div>
      )}

      {/* Hero Section */}
      <section className="admissions-hero section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-5 fw-bold text-primary mb-4">
                Start Your Journey at KATSS
              </h1>
              <p className="lead text-muted mb-5">
                Join our community of innovators and leaders. Our admissions process 
                is designed to identify talented students who will thrive in our 
                technical education environment.
              </p>
              
              <div className="admission-stats d-flex flex-wrap gap-4 mb-5">
                <div>
                  <h3 className="fw-bold text-primary mb-0">1,200+</h3>
                  <small className="text-muted">Current Students</small>
                </div>
                <div>
                  <h3 className="fw-bold text-primary mb-0">95%</h3>
                  <small className="text-muted">Acceptance Rate</small>
                </div>
                <div>
                  <h3 className="fw-bold text-primary mb-0">30%</h3>
                  <small className="text-muted">Receive Scholarships</small>
                </div>
                <div>
                  <h3 className="fw-bold text-primary mb-0">6</h3>
                  <small className="text-muted">Technical Programs</small>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={handleStartApplication}
                  className="px-5 fw-semibold"
                >
                  <FaFileAlt className="me-2" />
                  Apply Online
                </Button>
                <Button 
                  as={Link}
                  to="#requirements"
                  variant="outline-primary" 
                  size="lg"
                  className="px-5 fw-semibold"
                  onClick={() => setActiveTab('requirements')}
                >
                  <FaQuestionCircle className="me-2" />
                  View Requirements
                </Button>
              </div>
            </Col>

            <Col lg={6} className="mt-5 mt-lg-0">
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4">Application Timeline 2025-26</h4>
                  
                  <div className="timeline-progress mb-4">
                    <ProgressBar now={40} label="40% Complete" className="mb-3" />
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Application Opens: Jan 1</small>
                      <small className="text-muted">Deadline: Dec 31</small>
                    </div>
                  </div>

                  <div className="key-dates">
                    <h6 className="fw-semibold mb-3">
                      <FaCalendarAlt className="me-2 text-primary" />
                      Important Dates
                    </h6>
                    <ul className="list-unstyled">
                      <li className="mb-2 d-flex justify-content-between">
                        <span>Early Application Deadline</span>
                        <Badge bg="primary">Oct 31</Badge>
                      </li>
                      <li className="mb-2 d-flex justify-content-between">
                        <span>Regular Application Deadline</span>
                    <Badge bg="warning">Dec 15</Badge>                      </li>
                      <li className="mb-2 d-flex justify-content-between">
                        <span>Late Application (with fee)</span>
                        <Badge bg="danger">Dec 31</Badge>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Classes Begin</span>
                        <Badge bg="success">Jan 13, 2026</Badge>
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Application Process</h2>
            <p className="lead text-muted">
              Follow these simple steps to join KATSS
            </p>
          </div>

          <div className="process-steps">
            <div className="step-connector"></div>
            <Row className="g-4">
              {admissionSteps.map((step, index) => (
                <Col lg={2.4} key={index}>
                  <Card className={`step-card border-0 h-100 ${step.status}`}>
                    <Card.Body className="p-4 text-center">
                      <div className={`step-icon mb-3 ${step.status}`}>
                        <div className="icon-circle rounded-circle d-inline-flex align-items-center justify-content-center">
                          <span className="step-number">{step.step}</span>
                          <span className="step-icon-inner">
                            {step.icon}
                          </span>
                        </div>
                      </div>
                      <Card.Title as="h5" className="fw-bold mb-2">
                        {step.title}
                      </Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {step.description}
                      </Card.Text>
                      <div className="step-duration">
                        <FaClock className="me-1 small" />
                        <small className="text-muted">{step.duration}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div className="text-center mt-5">
            <Button 
              variant="outline-primary"
              size="lg"
              onClick={handleStartApplication}
              className="px-5"
            >
              Start Your Application
            </Button>
          </div>
        </Container>
      </section>

      {/* Requirements & Fees */}
      <section id="requirements" className="section-padding">
        <Container>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <div className="mb-5">
              <Nav variant="tabs" className="mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="requirements">
                    <FaFileAlt className="me-2" />
                    Requirements
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fees">
                    <FaMoneyBillWave className="me-2" />
                    Fee Structure
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="scholarships">
                    <FaUserGraduate className="me-2" />
                    Scholarships
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="faq">
                    <FaQuestionCircle className="me-2" />
                    FAQ
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* Requirements Tab */}
                <Tab.Pane eventKey="requirements">
                  <Row className="g-4">
                    {requirements.map((req, index) => (
                      <Col lg={3} md={6} key={index}>
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Body className="p-4">
                            <Card.Title as="h5" className="fw-bold mb-3">
                              {req.program}
                            </Card.Title>
                            <ul className="list-unstyled mb-0">
                              {req.items.map((item, idx) => (
                                <li key={idx} className="mb-2 d-flex align-items-start">
                                  <FaCheckCircle className="text-success me-2 mt-1 small" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <div className="documents-checklist mt-5">
                    <Card className="border-0 shadow-sm">
                      <Card.Body className="p-4">
                        <h5 className="fw-bold mb-4">Required Documents Checklist</h5>
                        <Row>
                          <Col md={6}>
                            <Form.Check type="checkbox" id="check1" label="Application Form (Signed)" />
                            <Form.Check type="checkbox" id="check2" label="Passport Photos (4 copies)" />
                            <Form.Check type="checkbox" id="check3" label="National ID/Passport Copy" />
                            <Form.Check type="checkbox" id="check4" label="Academic Certificates" />
                          </Col>
                          <Col md={6}>
                            <Form.Check type="checkbox" id="check5" label="Birth Certificate" />
                            <Form.Check type="checkbox" id="check6" label="Medical Certificate" />
                            <Form.Check type="checkbox" id="check7" label="Recommendation Letters" />
                            <Form.Check type="checkbox" id="check8" label="Fee Payment Receipt" />
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab.Pane>

                {/* Fees Tab */}
                <Tab.Pane eventKey="fees">
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Program</th>
                              <th>Tuition Fee</th>
                              <th>Registration</th>
                              <th>Total (Annual)</th>
                              <th>Payment Plan</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {feeStructure.map((fee, index) => (
                              <tr key={index}>
                                <td>
                                  <strong>{fee.program}</strong>
                                </td>
                                <td>{fee.tuition}</td>
                                <td>{fee.registration}</td>
                                <td>
                                  <Badge bg="primary">{fee.total}</Badge>
                                </td>
                                <td>{fee.installment}</td>
                                <td>
                                  <Button variant="outline-primary" size="sm">
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>

                  <div className="additional-fees mt-4">
                    <h6 className="fw-bold mb-3">Additional Fees & Charges</h6>
                    <Row className="g-3">
                      <Col md={4}>
                        <div className="fee-item p-3 bg-light rounded">
                          <h6 className="fw-semibold">Hostel Accommodation</h6>
                          <p className="mb-0">150,000 RWF per term</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="fee-item p-3 bg-light rounded">
                          <h6 className="fw-semibold">Examination Fee</h6>
                          <p className="mb-0">20,000 RWF per semester</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="fee-item p-3 bg-light rounded">
                          <h6 className="fw-semibold">Practical Materials</h6>
                          <p className="mb-0">50,000 - 100,000 RWF</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab.Pane>

                {/* Scholarships Tab */}
                <Tab.Pane eventKey="scholarships">
                  <Row className="g-4">
                    {scholarships.map((scholarship, index) => (
                      <Col lg={3} md={6} key={index}>
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Body className="p-4">
                            <div className="scholarship-header mb-3">
                              <Badge bg="success" className="mb-2">
                                {scholarship.coverage}
                              </Badge>
                              <Card.Title as="h5" className="fw-bold mb-3">
                                {scholarship.name}
                              </Card.Title>
                            </div>
                            
                            <div className="scholarship-details">
                              <h6 className="fw-semibold mb-2">Requirements:</h6>
                              <ul className="list-unstyled mb-4">
                                {scholarship.requirements.map((req, idx) => (
                                  <li key={idx} className="mb-1 small">
                                    <FaCheckCircle className="text-success me-2" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="scholarship-info d-flex justify-content-between">
                                <div>
                                  <small className="text-muted d-block">Deadline</small>
                                  <span className="fw-semibold">
                                    {new Date(scholarship.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                                <div>
                                  <small className="text-muted d-block">Slots</small>
                                  <span className="fw-semibold">{scholarship.slots}</span>
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                          <Card.Footer className="bg-transparent border-0">
                            <Button variant="outline-primary" size="sm" className="w-100">
                              Apply for Scholarship
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Alert variant="info" className="mt-4">
                    <FaQuestionCircle className="me-2" />
                    <strong>Need financial assistance?</strong> Contact our financial 
                    aid office at <a href="mailto:financialaid@katss.ac.rw">financialaid@katss.ac.rw</a>
                  </Alert>
                </Tab.Pane>

                {/* FAQ Tab */}
                <Tab.Pane eventKey="faq">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        What is the application deadline?
                      </Accordion.Header>
                      <Accordion.Body>
                        The regular application deadline is December 31, 2025. 
                        Early applications (before October 31) receive priority consideration.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Can I apply to multiple programs?
                      </Accordion.Header>
                      <Accordion.Body>
                        Yes, you can apply to up to 3 programs. However, you'll 
                        need to submit separate applications for each program.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Is there an application fee?
                      </Accordion.Header>
                      <Accordion.Body>
                        Yes, there is a non-refundable application fee of 10,000 RWF.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        How will I know if I'm accepted?
                      </Accordion.Header>
                      <Accordion.Body>
                        You'll receive an acceptance letter via email within 2-3 
                        weeks after your interview. You can also check your status 
                        through our online portal.
                      </Accordion.Body>
                    </Accordion.Item>
                    
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        Can I defer my admission?
                      </Accordion.Header>
                      <Accordion.Body>
                        Yes, admitted students can defer admission for up to one 
                        academic year with valid reasons.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Container>
      </section>

      {/* Contact Admissions */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="g-5">
            <Col lg={6}>
              <div className="contact-info">
                <h2 className="fw-bold text-primary mb-4">
                  Need Help with Your Application?
                </h2>
                <p className="text-muted mb-5">
                  Our admissions team is here to guide you through every step of 
                  the process. Contact us for personalized assistance.
                </p>

                <div className="contact-methods">
                  <div className="method-item d-flex align-items-start mb-4">
                    <div className="method-icon bg-primary rounded-circle p-3 me-3">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-2">Call Admissions</h5>
                      <p className="mb-1">
                        <a href="tel:+250788416574" className="text-decoration-none">
                          +250 788 416 574
                        </a>
                      </p>
                      <small className="text-muted">Mon-Fri, 8AM-5PM</small>
                    </div>
                  </div>

                  <div className="method-item d-flex align-items-start mb-4">
                    <div className="method-icon bg-primary rounded-circle p-3 me-3">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-2">Email Us</h5>
                      <p className="mb-1">
                        <a href="mailto:admissions@katss.ac.rw" className="text-decoration-none">
                          admissions@katss.ac.rw
                        </a>
                      </p>
                      <small className="text-muted">Response within 24 hours</small>
                    </div>
                  </div>

                  <div className="method-item d-flex align-items-start">
                    <div className="method-icon bg-primary rounded-circle p-3 me-3">
                      <FaCalendarAlt className="text-white" />
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-2">Schedule Visit</h5>
                      <p className="mb-1">
                        Book a campus tour to see our facilities
                      </p>
                      <Button variant="outline-primary" size="sm">
                        Book Tour
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow">
                <Card.Body className="p-4">
                  <h4 className="fw-bold mb-4">Quick Inquiry Form</h4>
                  <ContactForm />
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
              <h2 className="fw-bold mb-3">Ready to Apply?</h2>
              <p className="lead opacity-75 mb-0">
                Start your application today and join Rwanda's future innovators
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <Button 
                variant="light" 
                size="lg"
                onClick={handleStartApplication}
                className="fw-semibold px-5"
              >
                <FaArrowRight className="me-2" />
                Begin Application
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Admissions;
