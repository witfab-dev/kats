import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaStar, 
  FaStarHalfAlt,
  FaShare,
  FaLinkedin,
  FaTwitter,
  FaGraduationCap,
  FaCalendarAlt
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './TestimonialCard.css';

const TestimonialCard = ({
  id,
  name,
  role,
  program,
  graduationYear,
  quote,
  rating = 5,
  image,
  company,
  linkedin,
  twitter,
  featured = false,
  verified = true,
  date
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }
    
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-muted" />);
    }
    
    return stars;
  };

  const formatQuote = (text) => {
    if (!expanded && text.length > 150) {
      return `${text.substring(0, 150)}...`;
    }
    return text;
  };

  const handleShare = (platform) => {
    const shareText = `"${quote.substring(0, 100)}..." - ${name}, ${role}`;
    const shareUrl = window.location.origin + `/testimonials/${id}`;
    
    switch(platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank'
        );
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: `Testimonial from ${name}`,
            text: shareText,
            url: shareUrl,
          });
        }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  if (featured) {
    return (
      <Card className="featured-testimonial-card border-0 shadow-lg">
        <Card.Body className="p-5">
          <div className="testimonial-header d-flex align-items-start mb-4">
            <div className="author-avatar me-4">
              <LazyLoadImage
                src={image}
                alt={name}
                effect="blur"
                className="rounded-circle"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                placeholderSrc="https://placehold.co/80x80/003366/ffffff?text=Student"
              />
              {verified && (
                <span className="verified-badge" title="Verified Graduate">
                  <i className="bi bi-patch-check-fill text-primary"></i>
                </span>
              )}
            </div>
            
            <div className="author-info flex-grow-1">
              <h4 className="fw-bold mb-1">{name}</h4>
              <p className="text-primary mb-2 fw-semibold">{role}</p>
              <div className="d-flex align-items-center gap-3">
                {program && (
                  <span className="badge bg-light text-dark">
                    <FaGraduationCap className="me-1" />
                    {program}
                  </span>
                )}
                {graduationYear && (
                  <span className="text-muted">
                    <FaCalendarAlt className="me-1" />
                    Class of {graduationYear}
                  </span>
                )}
              </div>
            </div>
            
            <div className="rating ms-auto">
              <div className="stars d-flex mb-2">
                {renderStars()}
              </div>
              <small className="text-muted">Rating: {rating}/5</small>
            </div>
          </div>
          
          <div className="testimonial-quote position-relative my-4">
            <FaQuoteLeft className="quote-icon quote-left" />
            <blockquote className="fs-5 fst-italic px-5 py-3">
              {formatQuote(quote)}
              {quote.length > 150 && (
                <Button
                  variant="link"
                  className="text-primary p-0 ms-2"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Show less' : 'Read more'}
                </Button>
              )}
            </blockquote>
            <FaQuoteRight className="quote-icon quote-right" />
          </div>
          
          <div className="testimonial-footer d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
            {company && (
              <div className="company-info">
                <small className="text-muted d-block">Currently at</small>
                <strong>{company}</strong>
              </div>
            )}
            
            <div className="social-actions">
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => setShowSocial(!showSocial)}
              >
                <FaShare className="me-1" />
                Share
              </Button>
              
              {showSocial && (
                <div className="social-buttons d-inline-flex gap-2">
                  {linkedin && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      title="Share on LinkedIn"
                    >
                      <FaLinkedin />
                    </Button>
                  )}
                  {twitter && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      title="Share on Twitter"
                    >
                      <FaTwitter />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="testimonial-card h-100 border-0 shadow-sm hover-lift">
      <Card.Body className="d-flex flex-column p-4">
        <div className="quote-mark text-primary opacity-25 mb-3">
          <FaQuoteLeft size={40} />
        </div>
        
        <div className="testimonial-content flex-grow-1 mb-4">
          <blockquote className="fst-italic text-muted mb-0">
            "{formatQuote(quote)}"
            {quote.length > 120 && (
              <Button
                variant="link"
                className="text-primary p-0 ms-1"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show less' : '...more'}
              </Button>
            )}
          </blockquote>
        </div>
        
        <div className="rating mb-3">
          <div className="stars d-flex">
            {renderStars()}
          </div>
        </div>
        
        <div className="testimonial-author d-flex align-items-center">
          <div className="author-avatar me-3">
            <LazyLoadImage
              src={image}
              alt={name}
              effect="blur"
              className="rounded-circle"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              placeholderSrc="https://placehold.co/50x50/003366/ffffff?text=Student"
            />
            {verified && (
              <span className="verified-badge-small" title="Verified">
                <i className="bi bi-check-circle-fill text-success"></i>
              </span>
            )}
          </div>
          
          <div className="author-info">
            <h6 className="fw-bold mb-1">{name}</h6>
            <p className="text-muted small mb-1">{role}</p>
            {program && (
              <p className="text-primary small fw-semibold mb-0">
                <FaGraduationCap className="me-1" />
                {program}
              </p>
            )}
          </div>
        </div>
        
        {(company || date) && (
          <div className="testimonial-meta mt-3 pt-3 border-top">
            <div className="row g-2">
              {company && (
                <div className="col-12">
                  <small className="text-muted d-block">Employer</small>
                  <span className="fw-semibold">{company}</span>
                </div>
              )}
              {date && (
                <div className="col-12">
                  <small className="text-muted d-block">Shared</small>
                  <span className="fw-semibold">{formatDate(date)}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="testimonial-actions mt-3">
          <Button
            variant="outline-primary"
            size="sm"
            className="w-100"
            onClick={() => handleShare()}
          >
            <FaShare className="me-2" />
            Share Testimonial
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TestimonialCard;