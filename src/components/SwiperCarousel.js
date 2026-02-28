// src/components/SwiperCarousel.jsx
import React, { useState, useRef } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaPlay, 
  FaPause,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { stats } from '../assets/data/constants';
import { testimonials } from '../assets/data/testimonials';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './SwiperCarousel.css';

const SwiperCarousel = ({ 
  type = 'hero', // 'hero', 'stats', 'testimonials', 'gallery'
  items = [],
  title = '',
  subtitle = '',
  autoPlay = true,
  showControls = true,
  showPagination = true,
  loop = true,
  effect = 'slide', // 'slide', 'fade', 'cube', 'coverflow'
  itemsPerView = 1,
  spaceBetween = 30,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const swiperRef = useRef(null);

  // Default items based on type
  const getDefaultItems = () => {
    switch(type) {
      case 'stats':
        return stats;
      case 'testimonials':
        return testimonials.filter(t => t.featured);
      case 'hero':
      default:
        return items.length > 0 ? items : [
          {
            id: 1,
            title: "Excellence in Technical Education",
            subtitle: "Preparing Future Leaders and Innovators",
            image: "/images/hero/slide1.jpg",
            link: "/academics",
            buttonText: "Explore Programs",
            overlay: true
          },
          {
            id: 2,
            title: "State-of-the-Art Facilities",
            subtitle: "Modern labs and workshops for hands-on learning",
            image: "/images/hero/slide2.jpg",
            link: "/facilities",
            buttonText: "View Campus Tour",
            overlay: true
          },
          {
            id: 3,
            title: "Join Our Community",
            subtitle: "Admissions for 2025-2026 now open",
            image: "/images/hero/slide3.jpg",
            link: "/admissions",
            buttonText: "Apply Now",
            overlay: true
          }
        ];
    }
  };

  const carouselItems = items.length > 0 ? items : getDefaultItems();

  const swiperConfig = {
    modules: effect === 'fade' ? [Navigation, Pagination, Autoplay, EffectFade] : [Navigation, Pagination, Autoplay],
    spaceBetween,
    slidesPerView: itemsPerView,
    navigation: showControls,
    pagination: showPagination ? { clickable: true } : false,
    autoplay: isPlaying ? { 
      delay: 5000, 
      disableOnInteraction: false,
      pauseOnMouseEnter: true 
    } : false,
    loop,
    effect: effect === 'fade' ? 'fade' : undefined,
    fadeEffect: effect === 'fade' ? { crossFade: true } : undefined,
    onSlideChange: (swiper) => setActiveIndex(swiper.realIndex),
    className: `swiper-carousel ${type}-carousel ${className}`
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      swiperRef.current?.swiper.autoplay.start();
    } else {
      swiperRef.current?.swiper.autoplay.stop();
    }
  };

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const renderSlideContent = (item) => {
    switch(type) {
      case 'hero':
        return (
          <div className="hero-slide">
            <div 
              className="hero-background"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            
            {item.overlay && <div className="hero-overlay" />}
            
            <div className="hero-content">
              <h1 className="hero-title">{item.title}</h1>
              <p className="hero-subtitle">{item.subtitle}</p>
              
              {item.buttonText && (
                <Button
                  variant="primary"
                  size="lg"
                  as={Link}
                  to={item.link}
                  className="hero-btn"
                >
                  {item.buttonText}
                  <FaArrowRight className="ms-2" />
                </Button>
              )}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="stat-slide">
            <Card className="stat-card h-100">
              <Card.Body className="text-center">
                <div className="stat-icon mb-3">
                  <span style={{ fontSize: '3rem' }}>{item.icon}</span>
                </div>
                
                <h2 className="stat-value">
                  {item.value}
                  {item.suffix && <span className="suffix">{item.suffix}</span>}
                </h2>
                
                <Card.Title className="stat-label">{item.label}</Card.Title>
                
                {item.description && (
                  <Card.Text className="stat-description">
                    {item.description}
                  </Card.Text>
                )}
                
                {item.trend && (
                  <div className={`stat-trend trend-${item.trend}`}>
                    <span className="trend-value">
                      {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                      {item.trendValue}
                    </span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        );

      case 'testimonials':
        return (
          <div className="testimonial-slide">
            <Card className="testimonial-card h-100">
              <Card.Body>
                <div className="testimonial-header mb-4">
                  <div className="testimonial-author">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <h5 className="author-name mb-1">{item.name}</h5>
                      <p className="author-role mb-0">{item.role}</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(item.rating) ? (
                        <FaStar key={i} className="star filled" />
                      ) : (
                        <FaRegStar key={i} className="star" />
                      )
                    ))}
                    <span className="rating-value ms-2">{item.rating}</span>
                  </div>
                </div>
                
                <blockquote className="testimonial-quote">
                  "{item.quote}"
                </blockquote>
                
                {item.company && (
                  <div className="testimonial-company mt-4">
                    <strong>Company:</strong> {item.company}
                  </div>
                )}
                
                {item.achievements && item.achievements.length > 0 && (
                  <div className="testimonial-achievements mt-3">
                    <strong>Achievements:</strong>
                    <ul className="achievements-list">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        );

      default:
        return (
          <div className="generic-slide">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title || ''}
                className="slide-image"
              />
            )}
            {item.title && <h3>{item.title}</h3>}
            {item.subtitle && <p>{item.subtitle}</p>}
          </div>
        );
    }
  };

  return (
    <div className={`swiper-carousel-container ${type}-container`}>
      {/* Carousel Header */}
      {(title || subtitle) && (
        <div className="carousel-header">
          <div className="header-content">
            {title && <h2 className="carousel-title">{title}</h2>}
            {subtitle && <p className="carousel-subtitle">{subtitle}</p>}
          </div>
          
          {/* Custom Controls */}
          {showControls && (
            <div className="carousel-controls">
              <Button
                variant="outline-secondary"
                className="control-btn"
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                aria-label="Previous"
              >
                <FaChevronLeft />
              </Button>
              
              <Button
                variant="outline-secondary"
                className="control-btn"
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>
              
              <Button
                variant="outline-secondary"
                className="control-btn"
                onClick={() => swiperRef.current?.swiper.slideNext()}
                aria-label="Next"
              >
                <FaChevronRight />
              </Button>
              
              {type === 'hero' && (
                <Button
                  variant="outline-secondary"
                  className="control-btn"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  <FaExpand />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Swiper Container */}
      <div className="swiper-wrapper-container">
        <Swiper {...swiperConfig} ref={swiperRef}>
          {carouselItems.map((item) => (
            <SwiperSlide key={item.id}>
              {renderSlideContent(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination (if not using swiper's) */}
      {showPagination && !swiperConfig.pagination && (
        <div className="custom-pagination">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {carouselItems.length > 1 && (
        <div className="slide-counter">
          <span className="current-slide">{activeIndex + 1}</span>
          <span className="total-slides"> / {carouselItems.length}</span>
        </div>
      )}
    </div>
  );
};

export default SwiperCarousel;