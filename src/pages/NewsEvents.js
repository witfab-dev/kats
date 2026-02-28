// src/pages/NewsEvents.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Form,
  Tab,
  Tabs,
  ListGroup,
  Alert,
  Modal
} from 'react-bootstrap';
import { 
  FaCalendar, 
  FaClock, 
  FaMapMarkerAlt, 
  FaNewspaper,
  FaRegCalendarAlt,
  FaFilter,
  FaSearch,
  FaRegBookmark,
  FaBookmark,
  FaShare,
  FaExternalLinkAlt,
  FaRss,
  FaDownload,
  FaPrint
} from 'react-icons/fa';
import NewsSwiper from '../components/NewsSwiper';
import { events, eventCategories, eventTypes } from '../assets/data/events';
import { schoolInfo } from '../assets/data/constants';
import './NewsEvents.css';

const NewsEvents = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const now = new Date();
    
    // Filter events by date
    const upcoming = events.filter(event => new Date(event.date) >= now);
    const past = events.filter(event => new Date(event.date) < now);
    
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, []);

  const handleBookmark = (eventId) => {
    setBookmarkedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleShare = async (event) => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Event link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeRemaining = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffTime = event - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past Event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
    return `In ${Math.floor(diffDays / 30)} months`;
  };

  const filteredEvents = (activeTab === 'upcoming' ? upcomingEvents : pastEvents)
    .filter(event => 
      (selectedCategory === 'all' || event.category === selectedCategory) &&
      (searchQuery === '' || 
       event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       event.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const downloadCalendar = () => {
    // In a real app, this would generate an .ics file
    alert('Calendar download feature would be implemented here');
  };

  const printSchedule = () => {
    window.print();
  };

  return (
    <Container className="news-events-page">
      {/* Hero Section */}
      <div className="page-hero mb-5">
        <h1 className="display-4 mb-3">News & Events</h1>
        <p className="lead">
          Stay updated with the latest happenings at KATSS
        </p>
        
        <div className="hero-stats d-flex gap-4 mt-4">
          <div className="stat-item">
            <h3>{upcomingEvents.length}</h3>
            <p className="text-muted mb-0">Upcoming Events</p>
          </div>
          <div className="stat-item">
            <h3>{events.filter(e => e.featured).length}</h3>
            <p className="text-muted mb-0">Featured</p>
          </div>
          <div className="stat-item">
            <h3>{events.filter(e => e.registrationRequired).length}</h3>
            <p className="text-muted mb-0">Require Registration</p>
          </div>
        </div>
      </div>

      {/* Featured Events Carousel */}
      <div className="mb-5">
        <NewsSwiper 
          items={events.filter(e => e.featured)}
          title="Featured Events"
          subtitle="Don't miss these important school activities"
          itemsPerView={3}
        />
      </div>

      {/* Main Content */}
      <Row>
        <Col lg={8}>
          {/* Controls */}
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6} className="mb-3 mb-md-0">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={setActiveTab}
                    className="events-tabs"
                  >
                    <Tab eventKey="upcoming" title={`Upcoming (${upcomingEvents.length})`} />
                    <Tab eventKey="past" title={`Past Events (${pastEvents.length})`} />
                    <Tab eventKey="bookmarked" title={
                      <span>
                        <FaBookmark className="me-1" />
                        Bookmarked ({bookmarkedEvents.length})
                      </span>
                    } />
                  </Tabs>
                </Col>
                
                <Col md={6}>
                  <div className="d-flex gap-3">
                    <Form.Group className="flex-grow-1">
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          placeholder="Search events..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="outline-secondary">
                          <FaSearch />
                        </Button>
                      </div>
                    </Form.Group>
                    
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowCalendar(!showCalendar)}
                    >
                      <FaRegCalendarAlt />
                    </Button>
                  </div>
                </Col>
              </Row>
              
              {/* Category Filter */}
              <div className="category-filter mt-3">
                <div className="d-flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setSelectedCategory('all')}
                    size="sm"
                  >
                    All Events
                  </Button>
                  {eventCategories.slice(1).map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
                      onClick={() => setSelectedCategory(category.id)}
                      size="sm"
                    >
                      {category.name}
                      <Badge bg="light" text="dark" className="ms-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Calendar View (if enabled) */}
          {showCalendar && (
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Event Calendar</h5>
                  <div className="calendar-actions">
                    <Button variant="link" size="sm" onClick={downloadCalendar}>
                      <FaDownload className="me-1" />
                      Download
                    </Button>
                    <Button variant="link" size="sm" onClick={printSchedule}>
                      <FaPrint className="me-1" />
                      Print
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="calendar-placeholder text-center py-4">
                  <FaRegCalendarAlt size={48} className="text-muted mb-3" />
                  <h5>Calendar View</h5>
                  <p className="text-muted">
                    A full calendar implementation would go here
                  </p>
                  <Button variant="outline-primary" onClick={() => setShowCalendar(false)}>
                    Hide Calendar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <Alert variant="info" className="text-center py-5">
              <h4 className="mb-3">No events found</h4>
              <p className="mb-4">
                {activeTab === 'bookmarked' 
                  ? 'You haven\'t bookmarked any events yet.'
                  : 'No events match your current filters.'}
              </p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Alert>
          ) : (
            <div className="events-list">
              {filteredEvents.map(event => (
                <Card key={event.id} className="mb-3 event-card">
                  <Card.Body>
                    <Row>
                      <Col md={3} className="mb-3 mb-md-0">
                        <div className="event-date-card text-center">
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
                      
                      <Col md={6} className="mb-3 mb-md-0">
                        <div className="event-details">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <Card.Title className="event-title">
                                {event.title}
                              </Card.Title>
                              <div className="event-meta d-flex gap-3">
                                <span className="meta-item">
                                  <FaClock size={12} />
                                  <span className="ms-2">{event.time}</span>
                                </span>
                                <span className="meta-item">
                                  <FaMapMarkerAlt size={12} />
                                  <span className="ms-2">{event.location}</span>
                                </span>
                              </div>
                            </div>
                            
                            <div className="event-actions">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => handleBookmark(event.id)}
                                title={bookmarkedEvents.includes(event.id) ? 'Remove bookmark' : 'Bookmark event'}
                              >
                                {bookmarkedEvents.includes(event.id) ? (
                                  <FaBookmark className="text-warning" />
                                ) : (
                                  <FaRegBookmark />
                                )}
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => handleShare(event)}
                                title="Share event"
                              >
                                <FaShare />
                              </Button>
                            </div>
                          </div>
                          
                          <Card.Text className="event-description">
                            {event.description}
                          </Card.Text>
                          
                          <div className="event-tags">
                            <Badge bg="primary" className="me-2">{event.type}</Badge>
                            <Badge bg="secondary" className="me-2">{event.category}</Badge>
                            {event.registrationRequired && (
                              <Badge bg="warning">Registration Required</Badge>
                            )}
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={3}>
                        <div className="event-actions-panel text-center">
                          <div className="time-remaining mb-3">
                            <h5>{getTimeRemaining(event.date)}</h5>
                            {event.capacity && (
                              <div className="capacity-info">
                                <small className="text-muted">
                                  {event.registered}/{event.capacity} registered
                                </small>
                                <div className="progress mt-1">
                                  <div 
                                    className="progress-bar" 
                                    style={{ 
                                      width: `${(event.registered / event.capacity) * 100}%` 
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="d-grid gap-2">
                            <Button
                              variant={event.registrationRequired ? "primary" : "outline-primary"}
                              onClick={() => setSelectedEvent(event)}
                            >
                              {event.registrationRequired ? 'Register Now' : 'View Details'}
                              <FaExternalLinkAlt className="ms-2" />
                            </Button>
                            
                            <Button
                              variant="outline-secondary"
                              onClick={() => setSelectedEvent(event)}
                            >
                              More Info
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* RSS Feed Button */}
          <div className="text-center mt-4">
            <Button variant="outline-secondary">
              <FaRss className="me-2" />
              Subscribe to RSS Feed
            </Button>
          </div>
        </Col>
        
        <Col lg={4}>
          {/* Sidebar */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">
                <FaCalendar className="me-2" />
                Event Categories
              </h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {eventCategories.map(category => (
                  <ListGroup.Item 
                    key={category.id}
                    action
                    active={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="d-flex justify-content-between">
                      <span>{category.name}</span>
                      <Badge bg={selectedCategory === category.id ? 'light' : 'primary'}>
                        {category.count}
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className="stats-list">
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Total Events:</span>
                  <strong>{events.length}</strong>
                </div>
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Upcoming:</span>
                  <strong>{upcomingEvents.length}</strong>
                </div>
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Requiring Registration:</span>
                  <strong>{events.filter(e => e.registrationRequired).length}</strong>
                </div>
                <div className="stat-item d-flex justify-content-between mb-3">
                  <span>Featured Events:</span>
                  <strong>{events.filter(e => e.featured).length}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Event Types</h5>
            </Card.Header>
            <Card.Body>
              <div className="event-types">
                {eventTypes.map((type, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="me-2 mb-2"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body className="text-center">
              <h5 className="mb-3">Stay Updated</h5>
              <p className="text-muted mb-4">
                Subscribe to our newsletter for event updates
              </p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Button variant="primary" className="w-100">
                  Subscribe
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Event Detail Modal */}
      <Modal
        show={!!selectedEvent}
        onHide={() => setSelectedEvent(null)}
        size="lg"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="img-fluid rounded mb-3"
                  />
                </Col>
                
                <Col md={6}>
                  <h5>Event Details</h5>
                  <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item>
                      <strong>Date:</strong> {formatDate(selectedEvent.date)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Time:</strong> {selectedEvent.time}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Location:</strong> {selectedEvent.location}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Type:</strong> {selectedEvent.type}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Category:</strong> {selectedEvent.category}
                    </ListGroup.Item>
                    {selectedEvent.registrationRequired && (
                      <ListGroup.Item>
                        <strong>Status:</strong> {selectedEvent.registered}/{selectedEvent.capacity} registered
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Col>
              </Row>
              
              <h5 className="mt-4">Description</h5>
              <p>{selectedEvent.description}</p>
              
              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div className="mt-3">
                  <strong>Tags:</strong>
                  <div className="mt-2">
                    {selectedEvent.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-2">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
              
              {selectedEvent.registrationRequired ? (
                <Button 
                  variant="primary"
                  href={selectedEvent.registrationLink || '/register'}
                >
                  Register Now
                </Button>
              ) : (
                <Button 
                  variant="outline-primary"
                  onClick={() => handleShare(selectedEvent)}
                >
                  <FaShare className="me-2" />
                  Share Event
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default NewsEvents;