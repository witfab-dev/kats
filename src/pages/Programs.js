import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Tab, Nav, Badge, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
   FaCheckCircle ,
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp,
  FaCalendarAlt,
  FaUserGraduate,
  FaMoneyBillWave,
  FaClock,
  FaBook,
  FaIndustry,
  FaChartLine,
  FaDownload,
  FaArrowRight,
  FaShare,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Components
import Breadcrumb from '../components/Breadcrumb';
import ProgramCard from '../components/ProgramCard';

// Data
import { programs } from '../assets/data/programs';

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc');
  const [favorites, setFavorites] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    // Track page view
    import('../utils/analytics').then(({ trackPageView }) => {
      trackPageView('/programs');
    });
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(programs.map(p => p.category))];

  // Filter and sort programs
  const filteredPrograms = programs
    .filter(program => {
      const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           program.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch(sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'duration':
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);
          comparison = durationA - durationB;
          break;
        case 'popularity':
          // Simulate popularity based on program id for demo
          comparison = (b.id % 5) - (a.id % 5);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleToggleFavorite = (programId) => {
    setFavorites(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleAddToCompare = (programId) => {
    if (compareList.includes(programId)) {
      setCompareList(prev => prev.filter(id => id !== programId));
    } else if (compareList.length < 4) {
      setCompareList(prev => [...prev, programId]);
    }
  };

  const programsForComparison = programs.filter(p => compareList.includes(p.id));

  const getProgramStats = () => {
    const totalPrograms = programs.length;
    const totalDuration = programs.reduce((sum, p) => {
      const years = parseInt(p.duration) || 0;
      return sum + years;
    }, 0);
    const avgDuration = (totalDuration / totalPrograms).toFixed(1);
    
    const categoriesCount = {};
    programs.forEach(p => {
      categoriesCount[p.category] = (categoriesCount[p.category] || 0) + 1;
    });

    return { totalPrograms, avgDuration, categoriesCount };
  };

  const stats = getProgramStats();

  return (
    <>
      <Helmet>
        <title>Technical Programs - KATSS TVET Courses & Training</title>
        <meta 
          name="description" 
          content="Explore KATSS technical programs including Software Development, Building Construction, Accounting, Automobile Technology, Tourism, and Multimedia Production." 
        />
        <meta name="keywords" content="technical programs, TVET courses, software development, construction, accounting, automobile, tourism, multimedia" />
      </Helmet>

      <Breadcrumb 
        customItems={[
          { 
            path: '/programs', 
            name: 'Programs', 
            icon: <FaBook />, 
            active: true,
            actions: [
              {
                label: 'Compare Programs',
                href: '#',
                variant: 'outline-primary',
                icon: <FaChartLine />,
                onClick: () => setShowCompare(true)
              },
              {
                label: 'Download Catalog',
                href: '/downloads/program-catalog.pdf',
                variant: 'primary',
                icon: <FaDownload />
              }
            ]
          }
        ]}
      />

      {/* Hero Section */}
      <section className="programs-hero section-padding bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-5 fw-bold mb-4">
                Technical & Vocational Programs
              </h1>
              <p className="lead opacity-75 mb-5">
                Choose from our industry-focused programs designed to equip you with 
                practical skills for immediate employment or entrepreneurship.
              </p>
              <div className="hero-stats d-flex flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="fw-bold mb-0">{stats.totalPrograms}</h3>
                  <small className="opacity-75">Programs</small>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{stats.avgDuration} years</h3>
                  <small className="opacity-75">Average Duration</small>
                </div>
                <div>
                  <h3 className="fw-bold mb-0">95%</h3>
                  <small className="opacity-75">Employment Rate</small>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0">
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Program Categories</h5>
                  <div className="categories-grid">
                    {Object.entries(stats.categoriesCount).map(([category, count]) => (
                      <div key={category} className="category-item text-center p-3">
                        <div className="category-icon mb-2">
                          <div className="icon-circle bg-soft-primary rounded-circle d-inline-flex align-items-center justify-content-center p-3">
                            <span className="text-primary fw-bold">{category.charAt(0)}</span>
                          </div>
                        </div>
                        <h6 className="fw-semibold mb-1">{category}</h6>
                        <small className="text-muted">{count} programs</small>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search & Filter Section */}
      <section className="section-padding bg-light">
        <Container>
          <div className="search-filter-card p-4 rounded shadow-sm bg-white">
            <Row className="align-items-center g-3">
              <Col lg={4}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search programs by name, skills, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              
              <Col lg={3}>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col lg={3}>
                <div className="d-flex gap-2">
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity">Sort by Popularity</option>
                    <option value="title">Sort by Name</option>
                    <option value="duration">Sort by Duration</option>
                  </Form.Select>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
                    title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                  >
                    {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </Button>
                </div>
              </Col>
              
              <Col lg={2}>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowFilter(!showFilter)}
                    className="d-flex align-items-center"
                  >
                    <FaFilter className="me-2" />
                    Filter
                  </Button>
                  {compareList.length > 0 && (
                    <Badge bg="primary" className="compare-count">
                      {compareList.length}
                    </Badge>
                  )}
                </div>
              </Col>
            </Row>

            {/* Advanced Filters */}
            {showFilter && (
              <div className="advanced-filters mt-4 pt-4 border-top">
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold">Duration</Form.Label>
                      <Form.Select>
                        <option>Any Duration</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>3 Years</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold">Level</Form.Label>
                      <Form.Select>
                        <option>Any Level</option>
                        <option>Certificate</option>
                        <option>Diploma</option>
                        <option>Advanced Diploma</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold">Seats Available</Form.Label>
                      <Form.Select>
                        <option>Any Availability</option>
                        <option>Limited Seats</option>
                        <option>Available</option>
                        <option>Waitlist</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="small fw-semibold">Starting Month</Form.Label>
                      <Form.Select>
                        <option>Any Month</option>
                        <option>January</option>
                        <option>April</option>
                        <option>August</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {/* Compare Bar */}
            {compareList.length > 0 && (
              <div className="compare-bar mt-4 p-3 bg-primary text-white rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{compareList.length} programs selected for comparison</strong>
                    <small className="d-block opacity-75">
                      Select up to 4 programs to compare
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setShowCompare(true)}
                    >
                      Compare Now
                    </Button>
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => setCompareList([])}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="results-summary mt-4 d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0">
                Showing <strong>{filteredPrograms.length}</strong> of{' '}
                <strong>{programs.length}</strong> programs
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="link"
                size="sm"
                className={`p-0 ${favorites.length === 0 ? 'text-muted' : 'text-primary'}`}
                onClick={() => {
                  // Navigate to favorites or show modal
                }}
              >
                <FaHeart className="me-1" />
                Favorites ({favorites.length})
              </Button>
              <Button
                variant="link"
                size="sm"
                className="p-0 text-primary"
                onClick={() => window.print()}
              >
                <FaDownload className="me-1" />
                Print List
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <Container>
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-state-icon mb-4">
                <FaSearch size={48} className="text-muted" />
              </div>
              <h3 className="fw-bold mb-3">No programs found</h3>
              <p className="text-muted mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <Row className="g-4">
              {filteredPrograms.map((program) => (
                <Col lg={4} md={6} key={program.id}>
                  <div className="program-wrapper position-relative">
                    <ProgramCard {...program} />
                    
                    {/* Quick Actions Overlay */}
                    <div className="quick-actions position-absolute top-0 end-0 p-3">
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle shadow-sm"
                        onClick={() => handleToggleFavorite(program.id)}
                        title={favorites.includes(program.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        {favorites.includes(program.id) ? (
                          <FaHeart className="text-danger" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </Button>
                      
                      <Button
                        variant="light"
                        size="sm"
                        className="rounded-circle shadow-sm mt-2"
                        onClick={() => handleAddToCompare(program.id)}
                        title={compareList.includes(program.id) ? 'Remove from compare' : 'Add to compare'}
                      >
                        {compareList.includes(program.id) ? (
                          <FaChartLine className="text-primary" />
                        ) : (
                          <FaChartLine />
                        )}
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Program Comparison Modal */}
      <Modal
        show={showCompare}
        onHide={() => setShowCompare(false)}
        size="xl"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Compare Programs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {programsForComparison.length === 0 ? (
            <div className="text-center py-5">
              <FaChartLine size={48} className="text-muted mb-3" />
              <h5>No programs selected for comparison</h5>
              <p className="text-muted">
                Select up to 4 programs to compare their features
              </p>
            </div>
          ) : (
            <div className="comparison-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {programsForComparison.map(program => (
                      <th key={program.id}>
                        <div className="text-center">
                          <h6 className="fw-bold mb-2">{program.title}</h6>
                          <Badge bg="primary" className="mb-2">{program.category}</Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold">Duration</td>
                    {programsForComparison.map(program => (
                      <td key={program.id} className="text-center">
                        <FaClock className="me-2 text-primary" />
                        {program.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold">Level</td>
                    {programsForComparison.map(program => (
                      <td key={program.id} className="text-center">
                        <FaUserGraduate className="me-2 text-primary" />
                        {program.level}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold">Tuition</td>
                    {programsForComparison.map(program => (
                      <td key={program.id} className="text-center">
                        <FaMoneyBillWave className="me-2 text-primary" />
                        {program.tuition}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold">Key Skills</td>
                    {programsForComparison.map(program => (
                      <td key={program.id}>
                        <ul className="list-unstyled mb-0">
                          {program.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="mb-1">
                              <FaCheckCircle className="text-success me-2 small" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold">Career Paths</td>
                    {programsForComparison.map(program => (
                      <td key={program.id}>
                        <ul className="list-unstyled mb-0">
                          {program.careerPaths.slice(0, 2).map((path, idx) => (
                            <li key={idx} className="mb-1">
                              <FaIndustry className="text-primary me-2 small" />
                              {path}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompare(false)}>
            Close
          </Button>
          {programsForComparison.length > 0 && (
            <Button variant="primary" as={Link} to="/apply">
              Apply to Selected Programs
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* FAQ Section */}
      <section className="section-padding bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">
              Common questions about our programs and admissions
            </p>
          </div>

          <Row className="g-4">
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Program Selection</h5>
                  <div className="accordion accordion-flush" id="programFaq">
                    <div className="accordion-item border-0">
                      <h3 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                          How do I choose the right program?
                        </button>
                      </h3>
                      <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#programFaq">
                        <div className="accordion-body">
                          Consider your interests, career goals, and market demand. 
                          We offer career counseling to help you make the right choice.
                        </div>
                      </div>
                    </div>
                    
                    <div className="accordion-item border-0">
                      <h3 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                          Can I switch programs after starting?
                        </button>
                      </h3>
                      <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#programFaq">
                        <div className="accordion-body">
                          Yes, program transfers are possible within the first semester, 
                          subject to availability and academic performance.
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3">Admissions & Requirements</h5>
                  <div className="accordion accordion-flush" id="admissionFaq">
                    <div className="accordion-item border-0">
                      <h3 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                          What are the entry requirements?
                        </button>
                      </h3>
                      <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#admissionFaq">
                        <div className="accordion-body">
                          Requirements vary by program. Generally, you need O-Level 
                          certificates with specific subject combinations. Check each 
                          program page for details.
                        </div>
                      </div>
                    </div>
                    
                    <div className="accordion-item border-0">
                      <h3 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                          Is financial aid available?
                        </button>
                      </h3>
                      <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#admissionFaq">
                        <div className="accordion-body">
                          Yes, we offer scholarships and payment plans. Contact our 
                          admissions office for available options.
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Need Help Choosing a Program?</h2>
              <p className="lead opacity-75 mb-0">
                Schedule a consultation with our academic advisors
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
              <div className="d-flex flex-column flex-lg-row gap-3">
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="light" 
                  size="lg"
                  className="fw-semibold"
                >
                  <FaCalendarAlt className="me-2" />
                  Book Consultation
                </Button>
                <Button 
                  as={Link} 
                  to="/admissions" 
                  variant="outline-light" 
                  size="lg"
                  className="fw-semibold"
                >
                  <FaArrowRight className="me-2" />
                  View Admissions
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Programs;