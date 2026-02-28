import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight, 
  FaTag,
  FaClock,
  FaShareAlt
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './NewsCard.css';

const NewsCard = ({ 
  id,
  title,
  excerpt,
  content,
  date,
  category,
  author,
  image,
  tags = [],
  featured = false,
  readingTime,
  views = 0,
  onShare
}) => {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Achievements': 'success',
      'Events': 'primary',
      'Facilities': 'info',
      'Partnerships': 'warning',
      'Sports': 'danger',
      'Faculty': 'secondary',
      'Scholarships': 'purple',
      'Community': 'teal',
      'Default': 'dark'
    };
    return colors[category] || colors['Default'];
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.origin + `/news/${id}`,
      })
      .catch(console.error);
    } else if (onShare) {
      onShare(id);
    }
  };

  const estimatedReadingTime = readingTime || Math.ceil(content?.split(' ').length / 200) || 3;

  if (featured) {
    return (
      <Card className="featured-news-card border-0 shadow-lg overflow-hidden">
        <div className="row g-0 h-100">
          <div className="col-lg-6">
            <div className="featured-image-container position-relative">
              <LazyLoadImage
                src={image}
                alt={title}
                effect="blur"
                className="featured-image"
                placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS+News"
              />
              <div className="featured-badge">
                <Badge bg="primary" className="px-3 py-2">
                  <FaTag className="me-1" /> Featured
                </Badge>
              </div>
              <div className="image-overlay" />
            </div>
          </div>
          
          <div className="col-lg-6">
            <Card.Body className="h-100 d-flex flex-column p-4 p-lg-5">
              <div className="card-meta mb-3">
                <Badge bg={getCategoryColor(category)} className="me-2">
                  {category}
                </Badge>
                <span className="text-muted small">
                  <FaCalendarAlt className="me-1" />
                  {formatDate(date)}
                </span>
              </div>
              
              <Card.Title as="h3" className="fw-bold mb-3">
                <Link to={`/news/${id}`} className="text-decoration-none text-dark">
                  {title}
                </Link>
              </Card.Title>
              
              <Card.Text className="text-muted mb-4 flex-grow-1">
                {excerpt}
              </Card.Text>
              
              <div className="card-footer mt-auto">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="author-info d-flex align-items-center">
                    <div className="author-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                         style={{ width: '36px', height: '36px' }}>
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <small className="fw-semibold d-block">{author}</small>
                      <small className="text-muted">
                        <FaClock className="me-1" /> {estimatedReadingTime} min read
                      </small>
                    </div>
                  </div>
                  
                  <div className="actions">
                    <Button 
                      variant="link" 
                      className="text-muted me-2"
                      onClick={handleShare}
                      title="Share"
                    >
                      <FaShareAlt />
                    </Button>
                    <Button 
                      as={Link} 
                      to={`/news/${id}`}
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center"
                    >
                      Read More <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="news-card h-100 border-0 shadow-sm hover-lift">
      <div className="card-image-wrapper position-relative">
        <LazyLoadImage
          src={image}
          alt={title}
          effect="blur"
          className="card-img-top"
          placeholderSrc="https://placehold.co/600x400/003366/ffffff?text=KATSS"
        />
        <div className="category-badge">
          <Badge bg={getCategoryColor(category)}>
            {category}
          </Badge>
        </div>
        <div className="image-hover-overlay" />
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="card-meta mb-2">
          <small className="text-muted d-flex align-items-center">
            <FaCalendarAlt className="me-1" />
            {formatDate(date)}
            <span className="mx-2">•</span>
            <FaClock className="me-1" />
            {estimatedReadingTime} min read
          </small>
        </div>
        
        <Card.Title as="h5" className="fw-bold mb-3">
          <Link to={`/news/${id}`} className="text-decoration-none text-dark">
            {title}
          </Link>
        </Card.Title>
        
        <Card.Text className="text-muted mb-4 flex-grow-1">
          {excerpt.length > 120 ? `${excerpt.substring(0, 120)}...` : excerpt}
        </Card.Text>
        
        <div className="card-footer mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div className="author-info">
              <small className="text-muted">
                By <span className="fw-semibold">{author}</span>
              </small>
            </div>
            
            <div className="actions">
              <Button 
                variant="link" 
                className="text-muted me-2"
                onClick={handleShare}
                title="Share"
              >
                <FaShareAlt size={14} />
              </Button>
              <Button 
                as={Link} 
                to={`/news/${id}`}
                variant="link"
                className="text-primary p-0 d-flex align-items-center"
              >
                Read More <FaArrowRight className="ms-1" size={14} />
              </Button>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="tags mt-3 pt-2 border-top">
              <small className="text-muted me-2">Tags:</small>
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} bg="light" text="dark" className="me-1 small">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <small className="text-muted">+{tags.length - 3} more</small>
              )}
            </div>
          )}
          
          <div className="views-count mt-2">
            <small className="text-muted">
              {views.toLocaleString()} views
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;