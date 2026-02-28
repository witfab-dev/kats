// src/components/GalleryLightbox.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Button, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
import { 
  FaTimes, 
  FaArrowLeft, 
  FaArrowRight, 
  FaPlay, 
  FaPause,
  FaExpand,
  FaDownload,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaInfoCircle,
  FaClock,
  FaCalendar,
  FaTags,
  FaPlus,
  FaMinus,
  FaCompress,
  FaRegCopy
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import VideoPlayer from './VideoPlayer';
import { galleryImages, galleryVideos } from '../assets/data/gallery';
import useWindowSize from '../hooks/useWindowSize';
import './GalleryLightbox.css';

const GalleryLightbox = ({ 
  category = 'all',
  initialIndex = 0,
  show = false,
  onHide,
  mediaItems = null
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showInfo, setShowInfo] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const { width: windowWidth } = useWindowSize();

  // Combine and filter media
  const getMediaItems = useCallback(() => {
    if (mediaItems) return mediaItems;
    
    const allMedia = [
      ...galleryImages.map(img => ({ ...img, type: 'image' })),
      ...galleryVideos.map(vid => ({ ...vid, type: 'video' }))
    ];
    
    return category === 'all' 
      ? allMedia 
      : allMedia.filter(media => media.category === category);
  }, [category, mediaItems]);

  const filteredMedia = getMediaItems();
  const currentItem = filteredMedia[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!show) return;

      switch(e.key) {
        case 'Escape':
          onHide();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case ' ':
          e.preventDefault();
          if (currentItem?.type === 'video') {
            setIsPlaying(!isPlaying);
          }
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'i':
          setShowInfo(!showInfo);
          break;
        case 't':
          setShowThumbnails(!showThumbnails);
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          handleZoomReset();
          break;
        case 'd':
          handleDownload();
          break;
        case 's':
          handleShare();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, currentIndex, isPlaying, currentItem, zoomLevel]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Reset on show change
  useEffect(() => {
    if (show) {
      setCurrentIndex(initialIndex);
      setZoomLevel(1);
      setIsPlaying(false);
    }
  }, [show, initialIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredMedia.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  };

  const handleSelectThumbnail = (index) => {
    setCurrentIndex(index);
  };

  const toggleFavorite = () => {
    if (!currentItem) return;
    
    setFavorites(prev => 
      prev.includes(currentItem.id) 
        ? prev.filter(id => id !== currentItem.id)
        : [...prev, currentItem.id]
    );
  };

  const toggleFullscreen = async () => {
    if (!modalRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await modalRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const handleDownload = () => {
    if (!currentItem || currentItem.type !== 'image') return;

    setDownloadProgress(0);
    const link = document.createElement('a');
    link.href = currentItem.image;
    link.download = `katss-${currentItem.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Reset progress after 2 seconds
          setTimeout(() => setDownloadProgress(0), 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handleShare = async () => {
    if (!currentItem) return;

    const shareData = {
      title: currentItem.title,
      text: currentItem.description,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFileSize = (url) => {
    // This would normally come from your backend
    return '2.4 MB';
  };

  if (!show || !currentItem) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      centered
      className="gallery-lightbox-modal"
      ref={modalRef}
      backdrop="static"
    >
      <Modal.Body className="p-0 d-flex flex-column">
        {/* Top Controls Bar */}
        <div className="lightbox-header">
          <div className="header-left">
            <Button
              variant="link"
              className="text-white close-btn"
              onClick={onHide}
              aria-label="Close"
            >
              <FaTimes size={24} />
            </Button>
            
            <div className="media-info ms-3">
              <h5 className="text-white mb-0">{currentItem.title}</h5>
              <div className="d-flex align-items-center gap-2">
                <Badge bg="primary">{currentItem.category}</Badge>
                <small className="text-white-50">
                  {formatDate(currentItem.date)}
                </small>
                <small className="text-white-50">
                  • {currentIndex + 1} of {filteredMedia.length}
                </small>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <Button
              variant="link"
              className="text-white"
              onClick={toggleFavorite}
              aria-label={favorites.includes(currentItem.id) ? 'Remove from favorites' : 'Add to favorites'}
              title="Favorite"
            >
              {favorites.includes(currentItem.id) ? (
                <FaHeart className="text-danger" />
              ) : (
                <FaRegHeart />
              )}
            </Button>
            
            <Button
              variant="link"
              className="text-white"
              onClick={handleShare}
              aria-label="Share"
              title="Share"
            >
              {shareSuccess ? <FaRegCopy className="text-success" /> : <FaShare />}
            </Button>
            
            {currentItem.type === 'image' && (
              <Button
                variant="link"
                className="text-white"
                onClick={handleDownload}
                aria-label="Download"
                title="Download"
                disabled={downloadProgress > 0}
              >
                <FaDownload />
              </Button>
            )}
            
            <Button
              variant="link"
              className="text-white"
              onClick={() => setShowInfo(!showInfo)}
              aria-label={showInfo ? 'Hide info' : 'Show info'}
              title="Toggle Info"
            >
              <FaInfoCircle />
            </Button>
            
            <Button
              variant="link"
              className="text-white"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title="Fullscreen"
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lightbox-content flex-grow-1">
          {/* Navigation Arrows */}
          {filteredMedia.length > 1 && (
            <>
              <Button
                variant="link"
                className="nav-arrow nav-prev"
                onClick={handlePrevious}
                aria-label="Previous"
              >
                <FaArrowLeft size={windowWidth < 768 ? 24 : 32} />
              </Button>
              
              <Button
                variant="link"
                className="nav-arrow nav-next"
                onClick={handleNext}
                aria-label="Next"
              >
                <FaArrowRight size={windowWidth < 768 ? 24 : 32} />
              </Button>
            </>
          )}

          {/* Media Display */}
          <div className="media-container">
            {currentItem.type === 'image' ? (
              <div 
                className="image-wrapper"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? 'grab' : 'default'
                }}
                ref={imageRef}
                onDoubleClick={handleZoomIn}
              >
                <LazyLoadImage
                  src={currentItem.image}
                  alt={currentItem.title}
                  effect="opacity"
                  className="lightbox-image"
                  threshold={100}
                />
                
                {/* Download Progress */}
                {downloadProgress > 0 && (
                  <div className="download-overlay">
                    <ProgressBar 
                      now={downloadProgress} 
                      label={`${downloadProgress}%`}
                      className="download-progress"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="video-wrapper">
                <VideoPlayer
                  src={currentItem.video}
                  title={currentItem.title}
                  poster={currentItem.thumbnail}
                  autoPlay={isPlaying}
                  controls={true}
                  className="lightbox-video"
                />
                
                <div className="video-controls-overlay">
                  <Button
                    variant="primary"
                    className="play-pause-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Zoom Controls (for images) */}
          {currentItem.type === 'image' && (
            <div className="zoom-controls">
              <Button
                variant="light"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                aria-label="Zoom out"
              >
                <FaMinus />
              </Button>
              
              <div className="zoom-level">
                {Math.round(zoomLevel * 100)}%
              </div>
              
              <Button
                variant="light"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                aria-label="Zoom in"
              >
                <FaPlus />
              </Button>
              
              {zoomLevel !== 1 && (
                <Button
                  variant="light"
                  size="sm"
                  onClick={handleZoomReset}
                  className="ms-2"
                  aria-label="Reset zoom"
                >
                  Reset
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Info Panel */}
        {showInfo && (
          <div className="lightbox-footer">
            <div className="footer-content">
              <Row>
                <Col md={8}>
                  <h6>Description</h6>
                  <p className="mb-3">{currentItem.description}</p>
                  
                  <div className="media-meta">
                    <div className="meta-item">
                      <FaCalendar size={14} />
                      <span className="ms-2">{formatDate(currentItem.date)}</span>
                    </div>
                    <div className="meta-item">
                      <FaTags size={14} />
                      <span className="ms-2">{currentItem.category}</span>
                    </div>
                    {currentItem.type === 'video' && (
                      <div className="meta-item">
                        <FaClock size={14} />
                        <span className="ms-2">{currentItem.duration}</span>
                      </div>
                    )}
                    {currentItem.type === 'image' && (
                      <div className="meta-item">
                        <span className="ms-2">Size: {getFileSize(currentItem.image)}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {currentItem.tags && currentItem.tags.length > 0 && (
                    <div className="tags mt-3">
                      {currentItem.tags.map((tag, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Col>
                
                <Col md={4}>
                  <div className="media-stats">
                    <h6>Media Information</h6>
                    <div className="stats-list">
                      <div className="stat-item">
                        <span>Type:</span>
                        <strong>{currentItem.type === 'image' ? 'Photo' : 'Video'}</strong>
                      </div>
                      <div className="stat-item">
                        <span>Dimensions:</span>
                        <strong>{currentItem.size === 'landscape' ? 'Landscape' : 'Portrait'}</strong>
                      </div>
                      <div className="stat-item">
                        <span>Featured:</span>
                        <strong>{currentItem.featured ? 'Yes' : 'No'}</strong>
                      </div>
                      <div className="stat-item">
                        <span>Favorite:</span>
                        <strong>{favorites.includes(currentItem.id) ? 'Yes' : 'No'}</strong>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* Thumbnail Strip */}
        {showThumbnails && filteredMedia.length > 1 && (
          <div className="thumbnail-strip">
            <div className="thumbnail-container">
              {filteredMedia.map((item, index) => (
                <div
                  key={item.id}
                  className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleSelectThumbnail(index)}
                >
                  {item.type === 'image' ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="thumbnail-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="thumbnail-video">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="thumbnail-image"
                        loading="lazy"
                      />
                      <div className="video-indicator">
                        <FaPlay size={8} />
                      </div>
                    </div>
                  )}
                  {item.featured && (
                    <div className="featured-indicator" title="Featured">
                      ★
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button
              variant="link"
              className="thumbnail-toggle"
              onClick={() => setShowThumbnails(!showThumbnails)}
              title={showThumbnails ? 'Hide thumbnails' : 'Show thumbnails'}
            >
              {showThumbnails ? '▲' : '▼'}
            </Button>
          </div>
        )}

        {/* Mobile Controls */}
        {windowWidth < 768 && (
          <div className="mobile-controls">
            <div className="d-flex justify-content-around">
              <Button
                variant="light"
                size="sm"
                onClick={handlePrevious}
                disabled={filteredMedia.length <= 1}
              >
                <FaArrowLeft /> Previous
              </Button>
              
              {currentItem.type === 'image' && (
                <Button
                  variant="light"
                  size="sm"
                  onClick={handleDownload}
                  disabled={downloadProgress > 0}
                >
                  <FaDownload /> Download
                </Button>
              )}
              
              <Button
                variant="light"
                size="sm"
                onClick={handleNext}
                disabled={filteredMedia.length <= 1}
              >
                Next <FaArrowRight />
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GalleryLightbox;