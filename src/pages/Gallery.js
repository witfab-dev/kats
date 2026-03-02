// src/pages/Gallery.jsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { galleryImages, galleryVideos } from '../assets/data/gallery';
import './Gallery.css';

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    // Combine images and videos with proper type indicators
    const combined = [
      ...galleryImages.map(img => ({ ...img, type: 'image' })),
      ...galleryVideos.map(vid => ({ ...vid, type: 'video' }))
    ];
    setMediaItems(combined);
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsVideo(mediaItems[index].type === 'video');
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = mediaItems.length - 1;
    if (newIndex >= mediaItems.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setIsVideo(mediaItems[newIndex].type === 'video');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get correct video path (handles spaces in filenames)
  const getVideoPath = (videoPath) => {
    // Encode the path to handle spaces and special characters
    return encodeURI(videoPath);
  };

  return (
    <div className="gallery-page">
      <Container>
        <h2 style={{ textAlign: 'center' }}>Explore Our Campus Life</h2>
        <p style={{ textAlign: 'center', marginBottom: '40px' }}>
          Discover the vibrant atmosphere of KATSS through our photo collection showcasing student activities, campus facilities, and special events.
        </p>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {mediaItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`gallery-item ${item.type === 'video' ? 'video' : ''}`}
              onClick={() => openLightbox(index)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/003366/ffffff?text=KATSS';
                  }}
                />
              ) : (
                <div className="video-thumbnail">
                  <img 
                    src={item.thumbnail || '/images/video-placeholder.jpg'} 
                    alt={item.title}
                    className="video-preview"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/600x400/003366/ffffff?text=Video';
                    }}
                  />
                  <div className="video-play-btn">
                    <i className="bi bi-play-circle-fill"></i>
                  </div>
                  {item.duration && (
                    <div className="video-duration">{item.duration}</div>
                  )}
                </div>
              )}
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <small>{formatDate(item.date)}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && mediaItems[currentIndex] && (
          <div className={`lightbox-modal ${lightboxOpen ? 'active' : ''}`}>
            <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
            
            <div className="lightbox-nav">
              <span className="lightbox-prev" onClick={() => navigateLightbox(-1)}>&#10094;</span>
              <span className="lightbox-next" onClick={() => navigateLightbox(1)}>&#10095;</span>
            </div>

            <div className="lightbox-content">
              {!isVideo ? (
                <img 
                  id="lightbox-img" 
                  className="lightbox-img" 
                  src={mediaItems[currentIndex].image}
                  alt={mediaItems[currentIndex].title}
                  style={{ display: 'block' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/003366/ffffff?text=Image+Not+Found';
                  }}
                />
              ) : (
                <div id="lightbox-video" className="lightbox-video" style={{ display: 'block' }}>
                  <video 
                    id="video-player" 
                    controls 
                    autoPlay
                    key={mediaItems[currentIndex].video} // Force re-render when video changes
                  >
                    <source src={getVideoPath(mediaItems[currentIndex].video)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-controls">
                    <button className="video-control-btn play-pause">
                      <i className="bi bi-pause-fill"></i>
                    </button>
                    <button className="video-control-btn mute-btn">
                      <i className="bi bi-volume-up-fill"></i>
                    </button>
                    <div className="video-progress">
                      <div className="progress-bar" style={{ width: '0%' }}></div>
                    </div>
                    <div className="video-time">0:00 / {mediaItems[currentIndex].duration || '0:00'}</div>
                    <button className="video-control-btn fullscreen-btn">
                      <i className="bi bi-arrows-fullscreen"></i>
                    </button>
                  </div>
                </div>
              )}
              <div id="lightbox-caption" className="lightbox-caption">
                <h4>{mediaItems[currentIndex].title}</h4>
                <p>{mediaItems[currentIndex].description}</p>
                <small>{formatDate(mediaItems[currentIndex].date)}</small>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;