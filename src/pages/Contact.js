// src/pages/Contact.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Card, 
  Alert, 
  Tab, 
  Tabs,
  ListGroup,
  Badge
} from 'react-bootstrap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaUser,
  FaBuilding,
  FaComments
} from 'react-icons/fa';
import { schoolInfo, departments, operatingHours } from '../assets/data/constants';
import './Contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      newErrors.email = 'Invalid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // In a real application, you would send this to your backend
        console.log('Contact form submitted:', formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ submit: 'Failed to send message. Please try again.' });
      }
    }
  };

  const emergencyContacts = [
    { name: 'School Emergency', phone: '+250 788 123 456', type: 'emergency' },
    { name: 'Health Center', phone: '+250 788 234 567', type: 'medical' },
    { name: 'Security Office', phone: '+250 788 345 678', type: 'security' },
    { name: 'Student Affairs', phone: '+250 788 456 789', type: 'support' }
  ];

  const contactMethods = [
    {
      title: 'Phone Call',
      description: 'Speak directly with our staff',
      icon: <FaPhone size={24} />,
      details: schoolInfo.contact.phone,
      action: `tel:${schoolInfo.contact.phone}`
    },
    {
      title: 'Email',
      description: 'Send us a detailed message',
      icon: <FaEnvelope size={24} />,
      details: schoolInfo.contact.email,
      action: `mailto:${schoolInfo.contact.email}`
    },
    {
      title: 'Visit Campus',
      description: 'Schedule a campus tour',
      icon: <FaMapMarkerAlt size={24} />,
      details: schoolInfo.contact.address,
      action: '#map'
    },
    {
      title: 'Social Media',
      description: 'Connect with us online',
      icon: <FaComments size={24} />,
      details: '@katss_official',
      action: '#social'
    }
  ];

  const departmentContacts = [
    { name: 'Admissions Office', email: 'admissions@katss.ac.rw', phone: '+250 788 111 222' },
    { name: 'Academic Office', email: 'academics@katss.ac.rw', phone: '+250 788 222 333' },
    { name: 'Finance Office', email: 'finance@katss.ac.rw', phone: '+250 788 333 444' },
    { name: 'Student Affairs', email: 'studentaffairs@katss.ac.rw', phone: '+250 788 444 555' },
    { name: 'ICT Support', email: 'ict@katss.ac.rw', phone: '+250 788 555 666' },
    { name: 'Library', email: 'library@katss.ac.rw', phone: '+250 788 666 777' }
  ];

  return (
    <Container className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero text-center mb-5">
        <h1 className="display-4 mb-3">Contact Us</h1>
        <p className="lead">
          Get in touch with Kirehe Adventist Technical Secondary School. 
          We're here to help with any questions or concerns.
        </p>
      </div>

      {/* Contact Methods Cards */}
      <Row className="mb-5">
        {contactMethods.map((method, index) => (
          <Col key={index} md={3} sm={6} className="mb-4">
            <Card className="h-100 text-center contact-method-card">
              <Card.Body>
                <div className="method-icon mb-3">
                  {method.icon}
                </div>
                <Card.Title>{method.title}</Card.Title>
                <Card.Text className="text-muted small">
                  {method.description}
                </Card.Text>
                <p className="method-details">{method.details}</p>
                <Button 
                  variant="outline-primary" 
                  href={method.action}
                  className="w-100"
                >
                  {method.title === 'Social Media' ? 'Connect' : 'Contact'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main Content Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="contact" title="Send Message">
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Header>
                  <h4 className="mb-0">Send Us a Message</h4>
                </Card.Header>
                
                <Card.Body>
                  {submitted ? (
                    <Alert variant="success" className="text-center">
                      <h4>Thank You!</h4>
                      <p className="mb-0">
                        Your message has been sent successfully. 
                        We'll get back to you within 24-48 hours.
                      </p>
                      <Button 
                        variant="outline-success" 
                        className="mt-3"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </Alert>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Your Name *</Form.Label>
                            <Form.Control
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              isInvalid={!!errors.name}
                              placeholder="Enter your full name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              isInvalid={!!errors.email}
                              placeholder="your.email@example.com"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+250 XXX XXX XXX"
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                            >
                              <option value="">Select a department</option>
                              {departments.map((dept, index) => (
                                <option key={index} value={dept}>{dept}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Subject *</Form.Label>
                        <Form.Control
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          isInvalid={!!errors.subject}
                          placeholder="What is this regarding?"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          isInvalid={!!errors.message}
                          placeholder="Please provide details about your inquiry..."
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      {errors.submit && (
                        <Alert variant="danger" className="mt-3">
                          {errors.submit}
                        </Alert>
                      )}
                      
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100"
                      >
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaClock className="me-2" />
                    Operating Hours
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>School Hours:</strong>
                      <div className="mt-1">{operatingHours.school.weekdays}</div>
                      <small className="text-muted">Monday - Friday</small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Administration:</strong>
                      <div className="mt-1">{operatingHours.administration.weekdays}</div>
                      <small className="text-muted">Monday - Friday</small>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Library:</strong>
                      <div className="mt-1">{operatingHours.library.weekdays}</div>
                      <small className="text-muted">Monday - Friday</small>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <FaBuilding className="me-2" />
                    Department Contacts
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="department-contacts">
                    {departmentContacts.map((dept, index) => (
                      <div key={index} className="department-contact mb-3">
                        <h6 className="mb-1">{dept.name}</h6>
                        <div className="contact-details">
                          <small className="text-muted d-block">
                            {dept.email}
                          </small>
                          <small className="text-muted">
                            {dept.phone}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="directions" title="Directions & Map">
          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Body>
                  <h4 className="mb-3">How to Find Us</h4>
                  
                  <div className="directions-instructions mb-4">
                    <h5>From Kigali City Center:</h5>
                    <ol>
                      <li>Take the Kigali-Rusumo Road heading East</li>
                      <li>Continue for approximately 120km to Kirehe District</li>
                      <li>Enter Kigina Sector from the main road</li>
                      <li>Look for KATSS signage on your left</li>
                      <li>The school is located 2km from the main road</li>
                    </ol>
                    
                    <h5 className="mt-4">Public Transport:</h5>
                    <ul>
                      <li>Take a bus from Nyabugogo Bus Park to Kirehe</li>
                      <li>From Kirehe town, take a taxi-moto to Kigina Sector</li>
                      <li>Ask for "Kirehe Adventist Technical School"</li>
                    </ul>
                  </div>
                  
                  {/* Map Container - You would integrate with Google Maps API here */}
                  <div className="map-container">
                    <div className="map-placeholder">
                      <div className="map-content">
                        <h6 className="mb-3">KATSS Location</h6>
                        <p className="text-muted">
                          <FaMapMarkerAlt className="me-2" />
                          {schoolInfo.contact.address}
                        </p>
                        <p className="text-muted">
                          Coordinates: {schoolInfo.contact.coordinates.lat}, {schoolInfo.contact.coordinates.lng}
                        </p>
                        <Button 
                          variant="primary" 
                          href={`https://maps.google.com/?q=${schoolInfo.contact.coordinates.lat},${schoolInfo.contact.coordinates.lng}`}
                          target="_blank"
                        >
                          Open in Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <FaPhone className="me-2" />
                    Emergency Contacts
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {emergencyContacts.map((contact, index) => (
                      <ListGroup.Item key={index} className="emergency-contact">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{contact.name}</h6>
                            <Badge bg={contact.type === 'emergency' ? 'danger' : 'warning'}>
                              {contact.type}
                            </Badge>
                          </div>
                          <a 
                            href={`tel:${contact.phone}`} 
                            className="btn btn-sm btn-outline-danger"
                          >
                            <FaPhone /> Call
                          </a>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <Card className="mt-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <FaWhatsapp className="me-2" />
                    Quick Support
                  </h5>
                </Card.Header>
                <Card.Body className="text-center">
                  <p className="mb-3">
                    For quick questions, message us on WhatsApp
                  </p>
                  <Button 
                    variant="success" 
                    href="https://wa.me/250788416574" 
                    target="_blank"
                    className="w-100"
                  >
                    <FaWhatsapp className="me-2" />
                    Chat on WhatsApp
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="social" title="Social Media">
          <Card>
            <Card.Body>
              <h4 className="mb-4">Connect With Us on Social Media</h4>
              
              <Row>
                <Col md={3} sm={6} className="mb-4">
                  <Card className="social-card facebook">
                    <Card.Body className="text-center">
                      <FaFacebook size={48} className="mb-3" />
                      <Card.Title>Facebook</Card.Title>
                      <Card.Text>
                        Updates, events, and community discussions
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        href={schoolInfo.socialMedia.facebook}
                        target="_blank"
                        className="w-100"
                      >
                        Follow Us
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={3} sm={6} className="mb-4">
                  <Card className="social-card twitter">
                    <Card.Body className="text-center">
                      <FaTwitter size={48} className="mb-3" />
                      <Card.Title>Twitter</Card.Title>
                      <Card.Text>
                        News, announcements, and quick updates
                      </Card.Text>
                      <Button 
                        variant="info" 
                        href={schoolInfo.socialMedia.twitter}
                        target="_blank"
                        className="w-100"
                      >
                        Follow Us
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={3} sm={6} className="mb-4">
                  <Card className="social-card youtube">
                    <Card.Body className="text-center">
                      <FaYoutube size={48} className="mb-3" />
                      <Card.Title>YouTube</Card.Title>
                      <Card.Text>
                        Video tours, tutorials, and event recordings
                      </Card.Text>
                      <Button 
                        variant="danger" 
                        href={schoolInfo.socialMedia.youtube}
                        target="_blank"
                        className="w-100"
                      >
                        Subscribe
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={3} sm={6} className="mb-4">
                  <Card className="social-card instagram">
                    <Card.Body className="text-center">
                      <FaInstagram size={48} className="mb-3" />
                      <Card.Title>Instagram</Card.Title>
                      <Card.Text>
                        Photos, stories, and student life
                      </Card.Text>
                      <Button 
                        variant="warning" 
                        href={schoolInfo.socialMedia.instagram}
                        target="_blank"
                        className="w-100"
                      >
                        Follow Us
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <div className="mt-5">
                <h5 className="mb-3">Social Media Guidelines</h5>
                <Alert variant="light">
                  <ul className="mb-0">
                    <li>Be respectful and constructive in your comments</li>
                    <li>Tag us @katss_official for school-related content</li>
                    <li>Use hashtag #KATSSPride to share your experiences</li>
                    <li>Direct specific inquiries to appropriate departments</li>
                  </ul>
                </Alert>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* FAQ Section */}
      <Card className="mt-5">
        <Card.Header>
          <h4 className="mb-0">Frequently Asked Questions</h4>
        </Card.Header>
        <Card.Body>
          <div className="accordion" id="contactFAQ">
            {[
              {
                q: "What are the school visiting hours?",
                a: "Visitors are welcome Monday to Friday from 8:00 AM to 4:00 PM. Please schedule appointments in advance through the administration office."
              },
              {
                q: "How can I schedule a campus tour?",
                a: "You can schedule a campus tour by contacting the admissions office at +250 788 111 222 or emailing admissions@katss.ac.rw."
              },
              {
                q: "Where do I send application documents?",
                a: "Application documents can be submitted online through our portal or delivered to the admissions office at the school campus."
              },
              {
                q: "How long does it take to get a response?",
                a: "We aim to respond to all inquiries within 24-48 hours during business days. Admissions queries may take 3-5 business days for detailed responses."
              }
            ].map((faq, index) => (
              <div key={index} className="accordion-item">
                <h5 className="accordion-header">
                  <button 
                    className="accordion-button collapsed" 
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                  >
                    {faq.q}
                  </button>
                </h5>
                <div id={`faq${index}`} className="accordion-collapse collapse">
                  <div className="accordion-body">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;