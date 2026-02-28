// src/pages/StudentLife.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Tab, 
  Tabs, 
  Badge,
  ListGroup,
  Carousel,
  Alert,
  Modal,
  Form
} from 'react-bootstrap';
import { 
  FaPlay,
  FaUsers, 
  FaFutbol, 
  FaMusic, 
  FaGraduationCap, 
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaTrophy,
  FaMicrophone,
  FaBook,
  FaPaintBrush,
  FaLaptopCode,
  FaCamera,
  FaUtensils,
  FaPray,
  FaHandsHelping,
  FaStar
} from 'react-icons/fa';
import SwiperCarousel from '../components/SwiperCarousel';
import './StudentLife.css';

const StudentLife = () => {
  const [activeTab, setActiveTab] = useState('clubs');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    grade: '',
    club: '',
    experience: '',
    interests: ''
  });

  const clubs = [
    {
      id: 1,
      name: 'Science & Technology Club',
      description: 'Explore the wonders of science through experiments, projects, and competitions.',
      icon: <FaBook size={32} />,
      category: 'Academic',
      meetingTime: 'Every Tuesday, 3:00 PM',
      location: 'Science Lab',
      members: 45,
      advisor: 'Mr. David Mugisha',
      achievements: ['National Science Fair 2024 Winners', '3 Research Projects'],
      requirements: 'Interest in science, commitment to attend meetings'
    },
    {
      id: 2,
      name: 'Sports Club',
      description: 'Participate in various sports activities and represent the school in competitions.',
      icon: <FaFutbol size={32} />,
      category: 'Sports',
      meetingTime: 'Daily, 4:00 PM',
      location: 'Sports Complex',
      members: 120,
      advisor: 'Mr. Samuel Ndagijimana',
      achievements: ['District Football Champions 2024', 'Regional Athletics Winners'],
      requirements: 'Physical fitness, sportsmanship'
    },
    {
      id: 3,
      name: 'Music & Arts Club',
      description: 'Express creativity through music, dance, drama, and visual arts.',
      icon: <FaMusic size={32} />,
      category: 'Arts',
      meetingTime: 'Every Thursday, 2:00 PM',
      location: 'Art Room',
      members: 60,
      advisor: 'Ms. Grace Uwase',
      achievements: ['Cultural Festival Performers', 'Art Exhibition Organizers'],
      requirements: 'Interest in arts, willingness to perform'
    },
    {
      id: 4,
      name: 'ICT & Coding Club',
      description: 'Develop programming skills and work on tech projects.',
      icon: <FaLaptopCode size={32} />,
      category: 'Technology',
      meetingTime: 'Every Wednesday, 3:30 PM',
      location: 'Computer Lab',
      members: 55,
      advisor: 'Mrs. Alice Uwimana',
      achievements: ['App Development Competition Winners', 'Website Projects'],
      requirements: 'Basic computer skills, interest in coding'
    },
    {
      id: 5,
      name: 'Photography Club',
      description: 'Learn photography techniques and document school events.',
      icon: <FaCamera size={32} />,
      category: 'Media',
      meetingTime: 'Every Friday, 2:30 PM',
      location: 'Media Room',
      members: 35,
      advisor: 'Mr. Eric Niyonzima',
      achievements: ['School Magazine Photography', 'Event Coverage'],
      requirements: 'Access to camera (phone cameras welcome)'
    },
    {
      id: 6,
      name: 'Community Service Club',
      description: 'Participate in community outreach and volunteer activities.',
      icon: <FaHandsHelping size={32} />,
      category: 'Service',
      meetingTime: 'Every Saturday, 9:00 AM',
      location: 'Various Locations',
      members: 80,
      advisor: 'Ms. Sarah Mutoni',
      achievements: ['Community Clean-up Projects', 'Charity Fundraising'],
      requirements: 'Commitment to service, empathy'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Inter-House Sports Competition',
      date: '2025-11-20',
      type: 'Sports',
      description: 'Annual sports competition between school houses',
      participants: 200,
      location: 'Sports Complex'
    },
    {
      id: 2,
      title: 'Cultural Day Celebration',
      date: '2025-12-15',
      type: 'Cultural',
      description: 'Celebration of Rwanda\'s rich cultural heritage',
      participants: 500,
      location: 'Main Auditorium'
    },
    {
      id: 3,
      title: 'Science Fair Exhibition',
      date: '2025-12-05',
      type: 'Academic',
      description: 'Showcase of student science projects',
      participants: 150,
      location: 'Science Complex'
    },
    {
      id: 4,
      title: 'Music Concert',
      date: '2025-11-25',
      type: 'Arts',
      description: 'Performance by school music groups',
      participants: 100,
      location: 'School Grounds'
    }
  ];

  const facilities = [
    {
      name: 'Sports Complex',
      description: 'Football field, basketball court, volleyball court, athletics track',
      hours: '6:00 AM - 8:00 PM',
      capacity: '200 students'
    },
    {
      name: 'Library',
      description: 'Over 10,000 books, digital resources, study areas',
      hours: '8:00 AM - 8:00 PM',
      capacity: '150 students'
    },
    {
      name: 'Computer Labs',
      description: 'Modern computers with internet access, software development tools',
      hours: '7:00 AM - 6:00 PM',
      capacity: '50 students per lab'
    },
    {
      name: 'Art & Music Rooms',
      description: 'Musical instruments, art supplies, practice rooms',
      hours: '8:00 AM - 5:00 PM',
      capacity: '30 students'
    },
    {
      name: 'Cafeteria',
      description: 'Healthy meals, snacks, and refreshments',
      hours: '7:00 AM - 6:00 PM',
      capacity: '300 students'
    },
    {
      name: 'Health Center',
      description: 'Medical care, first aid, counseling services',
      hours: '24/7 Emergency, 8:00 AM - 5:00 PM Regular',
      capacity: 'N/A'
    }
  ];

  const testimonials = [
    {
      name: 'Alice Uwase',
      grade: 'S5',
      club: 'Music & Arts Club',
      quote: 'The clubs at KATSS helped me discover my passion for music. I\'ve performed in three school concerts!',
      achievement: 'Lead singer, school choir'
    },
    {
      name: 'John Mugisha',
      grade: 'S6',
      club: 'Science Club',
      quote: 'Our science club project won at the national fair. The guidance from teachers was incredible.',
      achievement: 'National Science Fair Winner'
    },
    {
      name: 'Marie Niyonsenga',
      grade: 'S4',
      club: 'Community Service',
      quote: 'Helping our community through volunteer work has been the most rewarding experience.',
      achievement: '100+ volunteer hours'
    }
  ];

  const handleJoinClub = (club) => {
    setSelectedActivity(club);
    setJoinForm(prev => ({ ...prev, club: club.name }));
    setShowJoinModal(true);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    console.log('Join form submitted:', joinForm);
    setShowJoinModal(false);
    setJoinForm({
      name: '',
      email: '',
      grade: '',
      club: '',
      experience: '',
      interests: ''
    });
  };

  return (
    <Container className="student-life-page">
      {/* Hero Section */}
      <div className="page-hero mb-5">
        <h1 className="display-4 mb-3">Student Life</h1>
        <p className="lead">
          Beyond academics: A vibrant community of activities, clubs, and personal growth
        </p>
        
        <div className="hero-stats d-flex gap-4 mt-4">
          <div className="stat-item">
            <h3>{clubs.length}</h3>
            <p className="text-muted mb-0">Student Clubs</p>
          </div>
          <div className="stat-item">
            <h3>85%</h3>
            <p className="text-muted mb-0">Student Participation</p>
          </div>
          <div className="stat-item">
            <h3>{events.length}</h3>
            <p className="text-muted mb-0">Annual Events</p>
          </div>
          <div className="stat-item">
            <h3>{facilities.length}</h3>
            <p className="text-muted mb-0">Facilities</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="mb-4 life-tabs"
      >
        <Tab eventKey="clubs" title={
          <span>
            <FaUsers className="me-2" />
            Clubs & Activities
          </span>
        } />
        <Tab eventKey="events" title={
          <span>
            <FaCalendarAlt className="me-2" />
            Events
          </span>
        } />
        <Tab eventKey="facilities" title={
          <span>
            <FaMapMarkerAlt className="me-2" />
            Facilities
          </span>
        } />
        <Tab eventKey="testimonials" title={
          <span>
            <FaStar className="me-2" />
            Student Stories
          </span>
        } />
      </Tabs>

      {/* Clubs & Activities Tab */}
      {activeTab === 'clubs' && (
        <>
          <div className="section-header mb-4">
            <h2>Student Clubs & Organizations</h2>
            <p className="lead">
              Join one of our diverse clubs to develop skills, make friends, and explore your interests
            </p>
          </div>

          <Row>
            {clubs.map(club => (
              <Col key={club.id} lg={4} md={6} className="mb-4">
                <Card className="club-card h-100">
                  <Card.Header className="club-header">
                    <div className="club-icon">
                      {club.icon}
                    </div>
                    <div className="club-title">
                      <Card.Title>{club.name}</Card.Title>
                      <Badge bg="primary">{club.category}</Badge>
                    </div>
                  </Card.Header>
                  
                  <Card.Body>
                    <Card.Text>{club.description}</Card.Text>
                    
                    <ListGroup variant="flush" className="mb-3">
                      <ListGroup.Item>
                        <strong>Meeting:</strong> {club.meetingTime}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Location:</strong> {club.location}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Members:</strong> {club.members} students
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Advisor:</strong> {club.advisor}
                      </ListGroup.Item>
                    </ListGroup>

                    {club.achievements.length > 0 && (
                      <div className="achievements mb-3">
                        <h6>Achievements:</h6>
                        <ul className="achievements-list">
                          {club.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card.Body>
                  
                  <Card.Footer>
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={() => handleJoinClub(club)}
                    >
                      Join This Club
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Club Benefits */}
          <Card className="mt-5">
            <Card.Header>
              <h4 className="mb-0">Benefits of Joining Clubs</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="text-center mb-4">
                  <div className="benefit-icon">
                    <FaGraduationCap size={32} />
                  </div>
                  <h6>Skill Development</h6>
                  <p className="small">Learn new skills beyond the classroom</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                  <div className="benefit-icon">
                    <FaUserFriends size={32} />
                  </div>
                  <h6>Social Growth</h6>
                  <p className="small">Build lasting friendships</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                  <div className="benefit-icon">
                    <FaTrophy size={32} />
                  </div>
                  <h6>Achievements</h6>
                  <p className="small">Gain recognition and awards</p>
                </Col>
                <Col md={3} className="text-center mb-4">
                  <div className="benefit-icon">
                    <FaHeart size={32} />
                  </div>
                  <h6>Personal Growth</h6>
                  <p className="small">Develop confidence and leadership</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <>
          <div className="section-header mb-4">
            <h2>Student Events Calendar</h2>
            <p className="lead">
              Annual events that make school life memorable and exciting
            </p>
          </div>

          <Row>
            <Col lg={8}>
              <div className="events-calendar mb-4">
                {events.map(event => (
                  <Card key={event.id} className="mb-3 event-item">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={3} className="text-center">
                          <div className="event-date">
                            <div className="event-month">
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                            <div className="event-day">
                              {new Date(event.date).getDate()}
                            </div>
                            <div className="event-year">
                              {new Date(event.date).getFullYear()}
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={6}>
                          <Card.Title>{event.title}</Card.Title>
                          <Card.Text className="mb-2">{event.description}</Card.Text>
                          <div className="event-details">
                            <Badge bg="primary" className="me-2">{event.type}</Badge>
                            <span className="me-3">
                              <FaUsers className="me-1" />
                              {event.participants} participants
                            </span>
                            <span>
                              <FaMapMarkerAlt className="me-1" />
                              {event.location}
                            </span>
                          </div>
                        </Col>
                        
                        <Col md={3} className="text-end">
                          <Button variant="outline-primary">
                            View Details
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
            
            <Col lg={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaCalendarAlt className="me-2" />
                    Upcoming Events
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {events.slice(0, 4).map(event => (
                      <ListGroup.Item key={event.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{event.title}</strong>
                            <div className="small text-muted">
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge bg="info">{event.type}</Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <Card>
                <Card.Body className="text-center">
                  <h5 className="mb-3">Event Participation</h5>
                  <div className="participation-stats">
                    <div className="stat-circle mb-3">
                      <div className="circle-text">
                        <h2 className="mb-0">85%</h2>
                        <small>Participation Rate</small>
                      </div>
                    </div>
                    <p className="text-muted">
                      Most students participate in at least one school event annually
                    </p>
                    <Button variant="outline-primary">
                      View Full Calendar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Facilities Tab */}
      {activeTab === 'facilities' && (
        <>
          <div className="section-header mb-4">
            <h2>Campus Facilities</h2>
            <p className="lead">
              State-of-the-art facilities supporting student development and wellbeing
            </p>
          </div>

          <Row>
            {facilities.map((facility, index) => (
              <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="facility-card h-100">
                  <Card.Body>
                    <div className="facility-header mb-3">
                      <h5>{facility.name}</h5>
                      <Badge bg="info">Capacity: {facility.capacity}</Badge>
                    </div>
                    
                    <Card.Text className="mb-3">{facility.description}</Card.Text>
                    
                    <div className="facility-hours">
                      <strong>Operating Hours:</strong> {facility.hours}
                    </div>
                    
                    <div className="facility-actions mt-3">
                      <Button variant="outline-primary" size="sm">
                        View Photos
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="ms-2">
                        Book Facility
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Facilities Carousel */}
          <div className="mt-5">
            <h4 className="mb-4">Campus Tour</h4>
            <SwiperCarousel 
              type="hero"
              items={[
                {
                  id: 1,
                  title: 'Modern Sports Complex',
                  subtitle: 'State-of-the-art facilities for physical education',
                  image: '/images/facilities/sports-complex.jpg'
                },
                {
                  id: 2,
                  title: 'Advanced Computer Labs',
                  subtitle: 'Equipped with latest technology for technical training',
                  image: '/images/facilities/computer-lab.jpg'
                },
                {
                  id: 3,
                  title: 'Extensive Library',
                  subtitle: 'Knowledge hub with digital and print resources',
                  image: '/images/facilities/library.jpg'
                }
              ]}
              autoPlay={true}
            />
          </div>
        </>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <>
          <div className="section-header mb-4">
            <h2>Student Stories</h2>
            <p className="lead">
              Hear from our students about their experiences and achievements
            </p>
          </div>

          <Row>
            {testimonials.map((testimonial, index) => (
              <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="testimonial-card h-100">
                  <Card.Body className="text-center">
                    <div className="student-avatar mb-3">
                      <div className="avatar-placeholder">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    
                    <Card.Title>{testimonial.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      {testimonial.grade} • {testimonial.club}
                    </Card.Subtitle>
                    
                    <blockquote className="testimonial-quote">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="achievement-badge mt-3">
                      <FaTrophy className="me-2 text-warning" />
                      <strong>Achievement:</strong> {testimonial.achievement}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Video Testimonials */}
          <Card className="mt-4">
            <Card.Header>
              <h4 className="mb-0">Video Testimonials</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-4">
                  <div className="video-testimonial">
                    <div className="video-placeholder">
                      <FaPlay size={48} className="play-icon" />
                    </div>
                    <div className="video-info mt-3">
                      <h6>Alice's Music Journey</h6>
                      <p className="text-muted small">
                        How music club transformed a shy student into a confident performer
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-4">
                  <div className="video-testimonial">
                    <div className="video-placeholder">
                      <FaPlay size={48} className="play-icon" />
                    </div>
                    <div className="video-info mt-3">
                      <h6>Science Club Success Story</h6>
                      <p className="text-muted small">
                        Winning project at the National Science Fair 2024
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}

      {/* Join Club Modal */}
      <Modal show={showJoinModal} onHide={() => setShowJoinModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join {selectedActivity?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleJoinSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                value={joinForm.name}
                onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                value={joinForm.email}
                onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Grade/Class *</Form.Label>
              <Form.Control
                type="text"
                value={joinForm.grade}
                onChange={(e) => setJoinForm({ ...joinForm, grade: e.target.value })}
                placeholder="e.g., S4, Level 5"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Previous Experience (if any)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={joinForm.experience}
                onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
                placeholder="Tell us about any relevant experience..."
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Why do you want to join this club? *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={joinForm.interests}
                onChange={(e) => setJoinForm({ ...joinForm, interests: e.target.value })}
                required
                placeholder="Share your interests and what you hope to gain..."
              />
            </Form.Group>
            
            <Alert variant="info" className="mb-4">
              <strong>Note:</strong> Club advisor will contact you within 3-5 business days.
              Most clubs have weekly meetings as indicated in the club details.
            </Alert>
            
            <Button variant="primary" type="submit" className="w-100">
              Submit Application
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Student Life Philosophy */}
      <Card className="mt-5">
        <Card.Header>
          <h4 className="mb-0">Our Student Life Philosophy</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>Holistic Development</h5>
              <p>
                We believe education extends beyond academics. Our student life programs are designed 
                to develop well-rounded individuals with strong character, leadership skills, and 
                social responsibility.
              </p>
              <ul>
                <li>Balanced approach to education</li>
                <li>Character building through activities</li>
                <li>Leadership opportunities</li>
                <li>Community engagement</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Inclusive Community</h5>
              <p>
                Every student has a place in our community. We foster an inclusive environment where 
                diverse talents are celebrated and every voice is heard.
              </p>
              <ul>
                <li>Supportive peer networks</li>
                <li>Mentorship programs</li>
                <li>Recognition of diverse achievements</li>
                <li>Safe and welcoming environment</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentLife;