import React, { useState } from 'react';
import { Card, Button, Badge, Modal, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUserGraduate, 
  FaArrowRight, 
  FaBook,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaChartLine,
  FaInfoCircle
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './ProgramCard.css';

const ProgramCard = ({
  id,
  title,
  category,
  description,
  duration,
  level,
  image,
  icon,
  features = [],
  careerPaths = [],
  requirements = [],
  tuition,
  seatsAvailable,
  applicationDeadline,
  popularity = 'medium' // low, medium, high
}) => {
  const [showModal, setShowModal] = useState(false);

  const getPopularityColor = (pop) => {
    switch(pop) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getPopularityText = (pop) => {
    switch(pop) {
      case 'high': return 'High Demand';
      case 'medium': return 'Moderate';
      case 'low': return 'Available';
      default: return 'N/A';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Contact for fees';
    if (typeof amount === 'number') {
      return `RWF ${amount.toLocaleString()}`;
    }
    return amount;
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Card className="program-card h-100 border-0 shadow-sm hover-lift">
        <div className="card-header position-relative">
          <div className="program-image-container">
            <LazyLoadImage
              src={image}
              alt={title}
              effect="blur"
              className="program-image"
              placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS"
            />
            <div className="program-overlay" />
            <div className="program-icon">
              <span className="icon-display" style={{ fontSize: '2.5rem' }}>
                {icon}
              </span>
            </div>
          </div>
          
          <div className="card-badges position-absolute top-0 start-0 p-3">
            <Badge bg="primary" className="me-2">
              {category}
            </Badge>
            <Badge bg={getPopularityColor(popularity)}>
              {getPopularityText(popularity)}
            </Badge>
          </div>
        </div>
        
        <Card.Body className="d-flex flex-column p-4">
          <Card.Title as="h4" className="fw-bold mb-3">
            <Link to={`/programs/${id}`} className="text-decoration-none text-dark">
              {title}
            </Link>
          </Card.Title>
          
          <Card.Text className="text-muted mb-4 flex-grow-1">
            {description}
          </Card.Text>
          
          <div className="program-details mb-4">
            <div className="row g-2">
              <div className="col-6">
                <div className="detail-item">
                  <FaClock className="text-primary me-2" />
                  <span className="small fw-semibold">{duration}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="detail-item">
                  <FaUserGraduate className="text-primary me-2" />
                  <span className="small fw-semibold">{level}</span>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="detail-item">
                  <FaMoneyBillWave className="text-primary me-2" />
                  <span className="small fw-semibold">{formatCurrency(tuition)}</span>
                  <small className="text-muted ms-1">per year</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="key-features mb-4">
            <h6 className="fw-semibold mb-3">
              <FaBook className="me-2 text-primary" />
              Key Skills You'll Learn
            </h6>
            <div className="features-list">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="feature-item d-flex align-items-center mb-2">
                  <FaCheckCircle className="text-success me-2 small" />
                  <span className="small">{feature}</span>
                </div>
              ))}
              {features.length > 3 && (
                <div className="feature-item">
                  <small className="text-muted">
                    +{features.length - 3} more skills
                  </small>
                </div>
              )}
            </div>
          </div>
          
          <div className="card-footer mt-auto">
            <div className="d-flex flex-wrap gap-2">
              <Button 
                as={Link}
                to={`/programs/${id}`}
                variant="primary"
                className="flex-grow-1 d-flex align-items-center justify-content-center"
              >
                <FaInfoCircle className="me-2" />
                View Details
              </Button>
              
              <Button 
                variant="outline-primary"
                className="flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={handleQuickView}
              >
                <FaChartLine className="me-2" />
                Quick View
              </Button>
            </div>
            
            {applicationDeadline && (
              <div className="deadline-alert mt-3 p-2 bg-light rounded text-center">
                <small className="text-muted d-flex align-items-center justify-content-center">
                  <FaCalendarAlt className="me-2" />
                  Apply by {applicationDeadline}
                </small>
              </div>
            )}
            
            {seatsAvailable !== undefined && (
              <div className="seats-info mt-2">
                <div className="progress" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(seatsAvailable / 50) * 100}%` }}
                  />
                </div>
                <small className="text-muted d-flex justify-content-between mt-1">
                  <span>Seats Available</span>
                  <span className="fw-semibold">{seatsAvailable}/50</span>
                </small>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Quick View Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="me-2">{icon}</span>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-4">
              <LazyLoadImage
                src={image}
                alt={title}
                effect="blur"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Program Overview</h6>
              <p className="text-muted">{description}</p>
              
              <div className="program-stats mb-4">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="stat-item text-center p-2 bg-light rounded">
                      <div className="stat-value text-primary fw-bold">{duration}</div>
                      <div className="stat-label small text-muted">Duration</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-item text-center p-2 bg-light rounded">
                      <div className="stat-value text-primary fw-bold">{level}</div>
                      <div className="stat-label small text-muted">Level</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="stat-item text-center p-2 bg-light rounded">
                      <div className="stat-value text-primary fw-bold">{formatCurrency(tuition)}</div>
                      <div className="stat-label small text-muted">Annual Tuition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Career Paths</h6>
              <ListGroup variant="flush">
                {careerPaths.slice(0, 5).map((path, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <FaArrowRight className="text-primary me-2" />
                    {path}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div className="col-md-6">
              <h6 className="fw-bold mb-3">Requirements</h6>
              <ListGroup variant="flush">
                {requirements.map((req, index) => (
                  <ListGroup.Item key={index} className="border-0 px-0 py-2">
                    <FaCheckCircle className="text-success me-2" />
                    {req}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            as={Link} 
            to={`/programs/${id}`}
            variant="primary"
            onClick={() => setShowModal(false)}
          >
            View Full Details <FaArrowRight className="ms-2" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProgramCard;