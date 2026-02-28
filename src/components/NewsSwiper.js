// src/components/NewsSwiper.jsx
import React, { useState, useRef } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  FaCalendar, 
  FaClock, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaExternalLinkAlt,
  FaRegBookmark,
  FaBookmark,
  FaShare,
  FaEye
} from 'react-icons/fa';
import { events } from '../assets/data/events';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NewsSwiper.css';

const NewsSwiper = ({ 
  items = events.filter(e => e.featured),
  title = "Featured News & Events",
  subtitle = "Stay updated with what's happening at KATSS",
  itemsPerView = 3,
  showControls = true,
  autoPlay = true,
  showViewAll = true
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const swiperRef = useRef(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeRemaining = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diffTime = event - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks`;
    return `${Math.floor(diffDays / 30)} months`;
  };

  const toggleBookmark = (eventId) => {
    setBookmarks(prev => 
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

  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
      640: { slidesPerView: Math.min(2, itemsPerView) },
      768: { slidesPerView: Math.min(2, itemsPerView) },
      1024: { slidesPerView: Math.min(3, itemsPerView) },
      1280: { slidesPerView: itemsPerView }
    },
    navigation: showControls,
    pagination: { clickable: true },
    autoplay: autoPlay ? { delay: 5000, disableOnInteraction: false } : false,
    loop: items.length > 1,
    className: "news-swiper"
  };

  return (
    <div className="news-swiper-section">
      {/* Header */}
      <div className="section-header mb-5">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        
        {showControls && (
          <div className="swiper-controls">
            <Button 
              variant="outline-primary" 
              className="swiper-button-prev-custom"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              ←
            </Button>
            <Button 
              variant="outline-primary" 
              className="swiper-button-next-custom"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              →
            </Button>
          </div>
        )}
      </div>

      {/* Swiper */}
      <Swiper {...swiperConfig} ref={swiperRef}>
        {items.map((event) => (
          <SwiperSlide key={event.id}>
            <Card className="event-card h-100">
              {/* Event Image */}
              <div className="event-image-container">
                <Card.Img 
                  variant="top" 
                  src={event.image} 
                  alt={event.title}
                  className="event-image"
                />
                
                {/* Image Overlay */}
                <div className="event-image-overlay">
                  <Badge bg="primary" className="event-type-badge">
                    {event.type}
                  </Badge>
                  
                  <div className="event-actions">
                    <Button
                      variant="link"
                      className="action-btn text-white"
                      onClick={() => toggleBookmark(event.id)}
                      aria-label={bookmarks.includes(event.id) ? 'Remove bookmark' : 'Bookmark event'}
                    >
                      {bookmarks.includes(event.id) ? (
                        <FaBookmark className="text-warning" />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </Button>
                    
                    <Button
                      variant="link"
                      className="action-btn text-white"
                      onClick={() => handleShare(event)}
                      aria-label="Share event"
                    >
                      <FaShare />
                    </Button>
                    
                    <Button
                      variant="link"
                      className="action-btn text-white"
                      onClick={() => setSelectedEvent(event)}
                      aria-label="View details"
                    >
                      <FaEye />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <Card.Body className="d-flex flex-column">
                {/* Event Meta */}
                <div className="event-meta mb-3">
                  <div className="meta-item">
                    <FaCalendar size={14} />
                    <span className="ms-2">{formatDate(event.date)}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock size={14} />
                    <span className="ms-2">{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt size={14} />
                    <span className="ms-2">{event.location}</span>
                  </div>
                </div>

                {/* Event Title & Description */}
                <Card.Title className="event-title">
                  {event.title}
                </Card.Title>
                
                <Card.Text className="event-description flex-grow-1">
                  {event.description.length > 120 
                    ? `${event.description.substring(0, 120)}...`
                    : event.description}
                </Card.Text>

                {/* Event Stats */}
                <div className="event-stats d-flex justify-content-between mb-3">
                  <div className="stat-item">
                    <span className="stat-label">Time</span>
                    <span className="stat-value">{getTimeRemaining(event.date)}</span>
                  </div>
                  
                  {event.capacity && (
                    <div className="stat-item">
                      <span className="stat-label">Capacity</span>
                      <span className="stat-value">{event.registered}/{event.capacity}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="event-actions-footer mt-auto">
                  {event.registrationRequired ? (
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Register Now
                      <FaArrowRight className="ms-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                      <FaExternalLinkAlt className="ms-2" />
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Button */}
      {showViewAll && (
        <div className="text-center mt-5">
          <Button 
            variant="outline-primary" 
            size="lg"
            href="/news-events"
          >
            View All News & Events
          </Button>
        </div>
      )}

      {/* Event Detail Modal */}
      <Modal
        show={!!selectedEvent}
        onHide={() => setSelectedEvent(null)}
        size="lg"
        centered
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedEvent.title}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              <div className="row">
                <div className="col-md-6">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="img-fluid rounded mb-3"
                  />
                </div>
                <div className="col-md-6">
                  <h5>Event Details</h5>
                  <div className="event-details-list">
                    <div className="detail-item">
                      <strong>Date:</strong> {formatDate(selectedEvent.date)}
                    </div>
                    <div className="detail-item">
                      <strong>Time:</strong> {selectedEvent.time}
                    </div>
                    <div className="detail-item">
                      <strong>Location:</strong> {selectedEvent.location}
                    </div>
                    <div className="detail-item">
                      <strong>Type:</strong> {selectedEvent.type}
                    </div>
                    <div className="detail-item">
                      <strong>Category:</strong> {selectedEvent.category}
                    </div>
                    {selectedEvent.capacity && (
                      <div className="detail-item">
                        <strong>Available Seats:</strong> {selectedEvent.capacity - selectedEvent.registered}
                      </div>
                    )}
                  </div>
                  
                  <h5 className="mt-4">Description</h5>
                  <p>{selectedEvent.description}</p>
                </div>
              </div>
            </Modal.Body>
            
            <Modal.Footer>
              {selectedEvent.registrationRequired ? (
                <Button 
                  variant="primary"
                  href={selectedEvent.registrationLink || '/register'}
                >
                  Register Now
                </Button>
              ) : (
                <Button 
                  variant="secondary"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NewsSwiper;