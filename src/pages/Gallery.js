// src/pages/Gallery.jsx
import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  ButtonGroup,
  Form,
  Badge,
  Modal,
  Tab,
  Tabs
} from 'react-bootstrap';
import { 
  FaFilter, 
  FaVideo, 
  FaImage, 
  FaPlay, 
  FaSearch,
  FaCalendar,
  FaTags,
  FaEye,
  FaDownload,
  FaShare,
  FaTh,
  FaList,
  FaSortAmountDown,
  FaRandom
} from 'react-icons/fa';
import GalleryLightbox from '../components/GalleryLightbox';
import VideoPlayer from '../components/VideoPlayer';
import { galleryImages, galleryVideos, galleryCategories } from '../assets/data/gallery';
import './Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('date'); // 'date', 'title', 'featured'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeTab, setActiveTab] = useState('photos'); // 'photos', 'videos', 'all'

  // Filter and sort media
  const filteredMedia = useMemo(() => {
    let media = [];
    
    // Combine based on active tab
    if (activeTab === 'photos') {
      media = galleryImages.map(img => ({ ...img, type: 'image' }));
    } else if (activeTab === 'videos') {
      media = galleryVideos.map(vid => ({ ...vid, type: 'video' }));
    } else {
      media = [
        ...galleryImages.map(img => ({ ...img, type: 'image' })),
        ...galleryVideos.map(vid => ({ ...vid, type: 'video' }))
      ];
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      media = media.filter(item => item.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      media = media.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Sort media
    media.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });
    
    return media;
  }, [activeCategory, searchQuery, sortBy, activeTab]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMediaClick = (media, index) => {
    setSelectedMedia({ ...media, index });
    setShowLightbox(true);
  };

  const handleDownload = (media) => {
    if (media.type === 'image') {
      const link = document.createElement('a');
      link.href = media.image;
      link.download = `katss-${media.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async (media) => {
    const shareData = {
      title: media.title,
      text: media.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Media link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Container className="gallery-page">
      {/* Hero Section */}
      <div className="gallery-hero text-center mb-5">
        <h1 className="display-4 mb-3">School Gallery</h1>
        <p className="lead">
          Explore our campus, facilities, events, and student activities through photos and videos
        </p>
      </div>

      {/* Gallery Controls */}
      <Card className="gallery-controls mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Group className="search-group">
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Search gallery..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <FaSearch />
                  </Button>
                </div>
              </Form.Group>
            </Col>
            
            <Col md={4} className="mb-3 mb-md-0">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="gallery-tabs"
              >
                <Tab eventKey="photos" title={
                  <span>
                    <FaImage className="me-2" />
                    Photos ({galleryImages.length})
                  </span>
                } />
                <Tab eventKey="videos" title={
                  <span>
                    <FaVideo className="me-2" />
                    Videos ({galleryVideos.length})
                  </span>
                } />
                <Tab eventKey="all" title={
                  <span>
                    <FaTh className="me-2" />
                    All ({galleryImages.length + galleryVideos.length})
                  </span>
                } />
              </Tabs>
            </Col>
            
            <Col md={4}>
              <div className="d-flex justify-content-end">
                <ButtonGroup className="me-3">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <FaTh />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <FaList />
                  </Button>
                </ButtonGroup>
                
                <ButtonGroup>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSortBy(sortBy === 'date' ? 'title' : 'date')}
                    title="Sort"
                  >
                    <FaSortAmountDown />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSortBy('random')}
                    title="Shuffle"
                  >
                    <FaRandom />
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Category Filter */}
      <div className="category-filter mb-5">
        <div className="d-flex align-items-center mb-3">
          <FaFilter className="me-2" />
          <h5 className="mb-0">Filter by Category</h5>
        </div>
        
        <div className="categories-scroll">
          {galleryCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
              onClick={() => setActiveCategory(category.id)}
              className="me-2 mb-2"
            >
              {category.name}
              <Badge bg="light" text="dark" className="ms-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Media Stats */}
      <Row className="mb-5">
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center stat-card">
            <Card.Body>
              <h2>{galleryImages.length}</h2>
              <p className="text-muted mb-0">Photos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center stat-card">
            <Card.Body>
              <h2>{galleryVideos.length}</h2>
              <p className="text-muted mb-0">Videos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center stat-card">
            <Card.Body>
              <h2>{galleryCategories.length}</h2>
              <p className="text-muted mb-0">Categories</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} className="mb-3">
          <Card className="text-center stat-card">
            <Card.Body>
              <h2>{filteredMedia.length}</h2>
              <p className="text-muted mb-0">Showing</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Media Grid/List */}
      {filteredMedia.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4 className="mb-3">No media found</h4>
            <p className="text-muted mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button
              variant="outline-primary"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </Button>
          </Card.Body>
        </Card>
      ) : viewMode === 'grid' ? (
        <Row className="gallery-grid">
          {filteredMedia.map((media, index) => (
            <Col key={media.id} lg={4} md={6} className="mb-4">
              <Card className="gallery-item-card">
                {/* Media Thumbnail */}
                <div 
                  className="gallery-thumbnail"
                  onClick={() => handleMediaClick(media, index)}
                >
                  {media.type === 'image' ? (
                    <Card.Img 
                      variant="top" 
                      src={media.image} 
                      alt={media.title}
                      className="thumbnail-image"
                    />
                  ) : (
                    <div className="video-thumbnail">
                      <Card.Img 
                        variant="top" 
                        src={media.thumbnail} 
                        alt={media.title}
                      />
                      <div className="video-overlay">
                        <FaPlay size={32} />
                      </div>
                      <div className="video-duration">
                        {media.duration}
                      </div>
                    </div>
                  )}
                  
                  {media.featured && (
                    <div className="featured-badge">
                      <Badge bg="warning">Featured</Badge>
                    </div>
                  )}
                  
                  <div className="media-type-badge">
                    <Badge bg={media.type === 'image' ? 'info' : 'danger'}>
                      {media.type === 'image' ? 'PHOTO' : 'VIDEO'}
                    </Badge>
                  </div>
                </div>
                
                {/* Card Body */}
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="media-title">
                      {media.title}
                    </Card.Title>
                    <div className="media-actions">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => handleShare(media)}
                        title="Share"
                      >
                        <FaShare />
                      </Button>
                      {media.type === 'image' && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(media);
                          }}
                          title="Download"
                        >
                          <FaDownload />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Card.Text className="media-description">
                    {media.description.length > 100 
                      ? `${media.description.substring(0, 100)}...`
                      : media.description}
                  </Card.Text>
                  
                  <div className="media-meta">
                    <div className="meta-item">
                      <FaCalendar size={12} />
                      <span className="ms-2">{formatDate(media.date)}</span>
                    </div>
                    <div className="meta-item">
                      <FaTags size={12} />
                      <span className="ms-2">{media.category}</span>
                    </div>
                  </div>
                  
                  <div className="media-tags mt-2">
                    {media.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} bg="light" text="dark" className="me-1">
                        #{tag}
                      </Badge>
                    ))}
                    {media.tags.length > 3 && (
                      <Badge bg="light" text="dark">
                        +{media.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="outline-primary"
                    className="w-100 mt-3"
                    onClick={() => handleMediaClick(media, index)}
                  >
                    <FaEye className="me-2" />
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="gallery-list">
          {filteredMedia.map((media, index) => (
            <Card key={media.id} className="gallery-list-item mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3} className="mb-3 mb-md-0">
                    <div 
                      className="list-thumbnail"
                      onClick={() => handleMediaClick(media, index)}
                    >
                      {media.type === 'image' ? (
                        <img 
                          src={media.image} 
                          alt={media.title}
                          className="img-fluid rounded"
                        />
                      ) : (
                        <div className="video-list-thumbnail">
                          <img 
                            src={media.thumbnail} 
                            alt={media.title}
                            className="img-fluid rounded"
                          />
                          <div className="video-list-overlay">
                            <FaPlay size={24} />
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                  
                  <Col md={6} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-start mb-2">
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{media.title}</h5>
                        <p className="text-muted mb-2">
                          {media.description}
                        </p>
                        
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          <Badge bg={media.type === 'image' ? 'info' : 'danger'}>
                            {media.type === 'image' ? 'Photo' : 'Video'}
                          </Badge>
                          <Badge bg="secondary">{media.category}</Badge>
                          {media.featured && (
                            <Badge bg="warning">Featured</Badge>
                          )}
                        </div>
                        
                        <div className="media-tags">
                          {media.tags.map((tag, idx) => (
                            <small key={idx} className="text-muted me-2">
                              #{tag}
                            </small>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md={3} className="text-md-end">
                    <div className="mb-3">
                      <small className="text-muted">
                        <FaCalendar className="me-1" />
                        {formatDate(media.date)}
                      </small>
                    </div>
                    
                    <div className="d-flex flex-column gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleMediaClick(media, index)}
                      >
                        <FaEye className="me-1" />
                        View
                      </Button>
                      
                      <div className="d-flex gap-2">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleShare(media)}
                          title="Share"
                        >
                          <FaShare />
                        </Button>
                        {media.type === 'image' && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleDownload(media)}
                            title="Download"
                          >
                            <FaDownload />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filteredMedia.length > 0 && (
        <div className="text-center mt-5">
          <Button variant="outline-primary" size="lg">
            Load More
          </Button>
        </div>
      )}

      {/* Featured Section */}
      <div className="featured-section mt-5">
        <h3 className="section-title mb-4">Featured Media</h3>
        <Row>
          {[...galleryImages, ...galleryVideos]
            .filter(media => media.featured)
            .slice(0, 3)
            .map((media, index) => (
              <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="featured-card">
                  <div 
                    className="featured-thumbnail"
                    onClick={() => handleMediaClick(media, index)}
                  >
                    {media.type === 'image' ? (
                      <Card.Img 
                        variant="top" 
                        src={media.image} 
                        alt={media.title}
                      />
                    ) : (
                      <div className="featured-video">
                        <Card.Img 
                          variant="top" 
                          src={media.thumbnail} 
                          alt={media.title}
                        />
                        <div className="video-play-overlay">
                          <FaPlay size={48} />
                        </div>
                      </div>
                    )}
                    <div className="featured-overlay">
                      <h5 className="text-white">{media.title}</h5>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        category={activeCategory}
        initialIndex={selectedMedia?.index || 0}
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
      />

      {/* Video Player Modal */}
      {selectedMedia?.type === 'video' && (
        <Modal
          show={showLightbox && selectedMedia?.type === 'video'}
          onHide={() => setShowLightbox(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedia?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <VideoPlayer
              src={selectedMedia?.video}
              title={selectedMedia?.title}
              poster={selectedMedia?.thumbnail}
              autoPlay={true}
              controls={true}
            />
            <div className="video-details mt-3">
              <h5>Description</h5>
              <p>{selectedMedia?.description}</p>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-item">
                    <strong>Category:</strong> {selectedMedia?.category}
                  </div>
                  <div className="detail-item">
                    <strong>Date:</strong> {formatDate(selectedMedia?.date)}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="detail-item">
                    <strong>Duration:</strong> {selectedMedia?.duration}
                  </div>
                  <div className="detail-item">
                    <strong>Type:</strong> Video
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Gallery;