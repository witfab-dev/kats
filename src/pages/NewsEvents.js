// src/pages/NewsEvents.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Button, Badge, Form, Modal } from 'react-bootstrap';
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaRss,
  FaDownload,
  FaPrint,
  FaArrowUp,
  FaThLarge,
  FaList,
  FaTag,
  FaStar,
  FaUsers,
  FaUserTie
} from 'react-icons/fa';
import { events, eventCategories, eventTypes } from '../assets/data/events';
import './NewsEvents.css';

const NewsEvents = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    registrationRequired: 0,
    bookmarked: 0
  });

  useEffect(() => {
    // Load events
    setTimeout(() => {
      setNewsItems(events);
      setFilteredItems(events);
      setStats({
        total: events.length,
        featured: events.filter(e => e.featured).length,
        registrationRequired: events.filter(e => e.registrationRequired).length,
        bookmarked: 0
      });
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    // Filter and sort items
    let result = [...newsItems];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(item => {
        const categoryMap = {
          'admissions': 'Admissions',
          'career': 'Professional Development',
          'academic': ['Science & Technology', 'Parent Engagement'],
          'cultural': 'Cultural Activities',
          'sports': 'Sports',
          'ceremony': 'Graduation',
          'alumni': 'Alumni'
        };
        
        const cat = categoryMap[selectedCategory];
        if (Array.isArray(cat)) {
          return cat.includes(item.category);
        }
        return item.category === cat;
      });
    }
    
    result.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
    
    setFilteredItems(result);
    setCurrentPage(1);
  }, [newsItems, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    setStats(prev => ({ ...prev, bookmarked: bookmarked.length }));
  }, [bookmarked]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatShortDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleBookmark = (id) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = async (item) => {
    const shareData = {
      title: item.title,
      text: item.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setShowModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (categoryName) => {
    const category = eventCategories.find(c => c.name === categoryName);
    return category?.icon || FaTag;
  };

  const getTypeIcon = (typeName) => {
    const type = eventTypes.find(t => t.name === typeName);
    return type?.icon || FaCalendarAlt;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="news-events-page loading-container">
        <div className="spinner"></div>
        <p>Loading amazing stories...</p>
      </div>
    );
  }

  return (
    <div className="news-events-page">
      {/* Hero Banner with Stats */}
      <div className="enhanced-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">News & Events</h1>
          <p className="hero-subtitle">Stay connected with the latest happenings at KATSS</p>
          
          <div className="hero-stats">
            <div className="stat-card">
              <FaCalendarAlt className="stat-icon" />
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Stories</span>
            </div>
            <div className="stat-card">
              <FaStar className="stat-icon" />
              <span className="stat-number">{stats.featured}</span>
              <span className="stat-label">Featured</span>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <span className="stat-number">{stats.registrationRequired}</span>
              <span className="stat-label">Need Registration</span>
            </div>
            <div className="stat-card">
              <FaBookmark className="stat-icon" />
              <span className="stat-number">{stats.bookmarked}</span>
              <span className="stat-label">Saved</span>
            </div>
          </div>
        </div>
      </div>

      <Container>
        {/* Search and Filter Bar */}
        <div className="search-filter-bar">
          <Row className="align-items-center g-3">
            <Col lg={4} md={6}>
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search news & events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <FaTimes 
                    className="clear-icon" 
                    onClick={() => setSearchQuery('')}
                  />
                )}
              </div>
            </Col>
            
            <Col lg={3} md={6}>
              <div className="filter-wrapper">
                <FaFilter className="filter-icon" />
                <Form.Select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {eventCategories.filter(c => c.id !== 'all').map(cat => {
                    const Icon = cat.icon;
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </Col>
            
            <Col lg={3} md={6}>
              <div className="sort-wrapper">
                <Form.Select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="popularity">Sort by Popularity</option>
                </Form.Select>
              </div>
            </Col>
            
            <Col lg={2} md={6}>
              <div className="view-toggle">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('grid')}
                  className="toggle-btn"
                >
                  <FaThLarge />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'}
                  onClick={() => setViewMode('list')}
                  className="toggle-btn"
                >
                  <FaList />
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle d-lg-none">
          <Button 
            variant="outline-primary"
            onClick={() => setShowFilters(!showFilters)}
            className="w-100"
          >
            <FaFilter className="me-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="mobile-filters">
            <div className="filter-section">
              <h6>Category</h6>
              <div className="category-chips">
                {eventCategories.filter(c => c.id !== 'all').map(cat => {
                  const Icon = cat.icon;
                  return (
                    <Badge
                      key={cat.id}
                      bg={selectedCategory === cat.id ? 'primary' : 'light'}
                      text={selectedCategory === cat.id ? 'white' : 'dark'}
                      className="category-chip"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowFilters(false);
                      }}
                    >
                      <Icon className="me-1" /> {cat.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            <div className="filter-section">
              <h6>Sort By</h6>
              <div className="sort-options">
                {['date', 'title', 'popularity'].map(option => (
                  <Badge
                    key={option}
                    bg={sortBy === option ? 'primary' : 'light'}
                    text={sortBy === option ? 'white' : 'dark'}
                    className="sort-chip"
                    onClick={() => {
                      setSortBy(option);
                      setShowFilters(false);
                    }}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="results-info">
          <p>
            Showing <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)}</strong> of <strong>{filteredItems.length}</strong> stories
          </p>
        </div>

        {/* News Grid/List */}
        {currentItems.length === 0 ? (
          <div className="empty-state">
            <FaSearch size={48} className="empty-icon" />
            <h3>No stories found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <Button 
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="enhanced-news-grid">
            {currentItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              const CategoryIcon = getCategoryIcon(item.category);
              
              return (
                <div 
                  key={item.id || index} 
                  className="news-card-wrapper"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <article className="enhanced-news-card">
                    <div className="card-image-container">
                      <img 
                        src={item.image || '../images/placeholder.jpg'} 
                        alt={item.title}
                        className="card-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/600x400/003366/ffffff?text=KATSS';
                        }}
                      />
                      {item.featured && (
                        <Badge bg="warning" className="featured-badge">
                          <FaStar className="me-1" /> Featured
                        </Badge>
                      )}
                      <div className="image-overlay">
                        <Button 
                          variant="light" 
                          className="quick-view-btn"
                          onClick={() => handleEventClick(item)}
                        >
                          <FaEye /> Quick View
                        </Button>
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <div className="card-header">
                        <Badge bg="primary" className="category-badge">
                          <CategoryIcon className="me-1" /> {item.category}
                        </Badge>
                        <Button
                          variant="link"
                          className="bookmark-btn"
                          onClick={() => handleBookmark(item.id)}
                        >
                          {bookmarked.includes(item.id) ? (
                            <FaBookmark className="text-warning" />
                          ) : (
                            <FaRegBookmark />
                          )}
                        </Button>
                      </div>
                      
                      <h3 className="card-title">
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          handleEventClick(item);
                        }}>
                          {item.title}
                        </a>
                      </h3>
                      
                      <p className="card-description">{item.description}</p>
                      
                      <div className="card-meta">
                        <span className="meta-date">
                          <FaCalendarAlt /> {formatShortDate(item.date)}
                        </span>
                        <span className="meta-time">
                          <FaClock /> {item.time}
                        </span>
                        {item.views && (
                          <span className="meta-views">
                            <FaEye /> {item.views}
                          </span>
                        )}
                      </div>
                      
                      <div className="card-footer">
                        <Button 
                          variant="link" 
                          className="read-more-btn"
                          onClick={() => handleEventClick(item)}
                        >
                          Read More
                        </Button>
                        <div className="action-icons">
                          <FaShare 
                            className="share-icon" 
                            onClick={() => handleShare(item)}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="enhanced-news-list">
            {currentItems.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              const CategoryIcon = getCategoryIcon(item.category);
              
              return (
                <div 
                  key={item.id || index} 
                  className="list-item-wrapper"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <article className="list-card">
                    <div className="list-image-container">
                      <img 
                        src={item.image || '../images/placeholder.jpg'} 
                        alt={item.title}
                        onClick={() => handleEventClick(item)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/600x400/003366/ffffff?text=KATSS';
                        }}
                      />
                      {item.featured && (
                        <Badge bg="warning" className="list-featured">
                          <FaStar className="me-1" /> Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="list-content">
                      <div className="list-header">
                        <Badge bg="primary" className="list-category">
                          <CategoryIcon className="me-1" /> {item.category}
                        </Badge>
                        <div className="list-actions">
                          <Button
                            variant="link"
                            className="list-bookmark"
                            onClick={() => handleBookmark(item.id)}
                          >
                            {bookmarked.includes(item.id) ? (
                              <FaBookmark className="text-warning" />
                            ) : (
                              <FaRegBookmark />
                            )}
                          </Button>
                          <FaShare 
                            className="list-share" 
                            onClick={() => handleShare(item)}
                          />
                        </div>
                      </div>
                      
                      <h3 className="list-title" onClick={() => handleEventClick(item)}>
                        {item.title}
                      </h3>
                      
                      <p className="list-description">{item.description}</p>
                      
                      <div className="list-footer">
                        <div className="list-meta">
                          <span><FaCalendarAlt /> {formatShortDate(item.date)}</span>
                          <span><FaClock /> {item.time}</span>
                          {item.views && <span><FaEye /> {item.views}</span>}
                        </div>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleEventClick(item)}
                        >
                          Read Full Story
                        </Button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-wrapper">
            <Button
              variant="outline-primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-arrow"
            >
              <FaChevronLeft />
            </Button>
            
            <div className="pagination-numbers">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'primary' : 'outline-primary'}
                  onClick={() => paginate(i + 1)}
                  className="pagination-number"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline-primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-arrow"
            >
              <FaChevronRight />
            </Button>
          </div>
        )}

        {/* RSS Feed and Actions */}
        <div className="feed-actions">
          <Button variant="outline-secondary" className="feed-btn">
            <FaRss className="me-2 text-warning" />
            Subscribe to RSS
          </Button>
          <Button variant="outline-secondary" className="feed-btn">
            <FaDownload className="me-2" />
            Download Events
          </Button>
          <Button variant="outline-secondary" className="feed-btn">
            <FaPrint className="me-2" />
            Print Calendar
          </Button>
        </div>
      </Container>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button 
          className="scroll-top-btn"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </Button>
      )}

      {/* Event Detail Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        className="event-modal"
      >
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedEvent.title}
                {selectedEvent.featured && (
                  <Badge bg="warning" className="ms-2">Featured</Badge>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-image-container">
                <img 
                  src={selectedEvent.image || '../images/placeholder.jpg'} 
                  alt={selectedEvent.title}
                  className="modal-image"
                />
              </div>
              
              <div className="modal-content-section">
                <div className="modal-meta">
                  <span><FaCalendarAlt /> {formatDate(selectedEvent.date)}</span>
                  <span><FaClock /> {selectedEvent.time}</span>
                  <span><FaMapMarkerAlt /> {selectedEvent.location}</span>
                </div>
                
                <div className="modal-category-badges">
                  <Badge bg="primary" className="me-2">
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedEvent.type);
                      return <TypeIcon className="me-1" />;
                    })()}
                    {selectedEvent.type}
                  </Badge>
                  <Badge bg="secondary">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(selectedEvent.category);
                      return <CategoryIcon className="me-1" />;
                    })()}
                    {selectedEvent.category}
                  </Badge>
                </div>
                
                <p className="modal-description">{selectedEvent.description}</p>
                
                {selectedEvent.registrationRequired && (
                  <div className="registration-info">
                    <h6>Registration Status</h6>
                    <div className="progress mb-2">
                      <div 
                        className="progress-bar bg-success" 
                        style={{ width: `${(selectedEvent.registered / selectedEvent.capacity) * 100}%` }}
                      />
                    </div>
                    <p className="text-muted small">
                      {selectedEvent.registered} of {selectedEvent.capacity} spots filled
                    </p>
                  </div>
                )}
                
                {selectedEvent.tags && (
                  <div className="modal-tags">
                    <FaTag className="me-2 text-primary" />
                    {selectedEvent.tags.map(tag => (
                      <Badge key={tag} bg="light" text="dark" className="modal-tag">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleShare(selectedEvent)}>
                <FaShare className="me-2" /> Share
              </Button>
              {selectedEvent.registrationRequired && (
                <Button 
                  variant="success"
                  href={selectedEvent.registrationLink || '/register'}
                >
                  Register Now
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NewsEvents;