import React from 'react';
import { Breadcrumb as BootstrapBreadcrumb, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaChevronRight, 
  FaFolder, 
  FaFileAlt,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaImages,
  FaPhone
} from 'react-icons/fa';
import './Breadcrumb.css';

const Breadcrumb = ({ 
  customItems = [],
  showHome = true,
  separator = <FaChevronRight size={12} />,
  className = ''
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map path segments to display names and icons
  const getBreadcrumbInfo = (path) => {
    const breadcrumbMap = {
      'about': { name: 'About Us', icon: <FaUserGraduate /> },
      'academics': { name: 'Academics', icon: <FaBook /> },
      'programs': { name: 'Programs', icon: <FaBook /> },
      'admissions': { name: 'Admissions', icon: <FaUserGraduate /> },
      'apply': { name: 'Apply Online', icon: <FaFileAlt /> },
      'student-life': { name: 'Student Life', icon: <FaUserGraduate /> },
      'news-events': { name: 'News & Events', icon: <FaCalendarAlt /> },
      'gallery': { name: 'Gallery', icon: <FaImages /> },
      'contact': { name: 'Contact Us', icon: <FaPhone /> },
      'privacy-policy': { name: 'Privacy Policy', icon: <FaFileAlt /> },
      'terms': { name: 'Terms of Service', icon: <FaFileAlt /> },
      'faq': { name: 'FAQ', icon: <FaFileAlt /> },
      'sitemap': { name: 'Sitemap', icon: <FaFolder /> },
      'downloads': { name: 'Downloads', icon: <FaFolder /> },
      'careers': { name: 'Careers', icon: <FaUserGraduate /> },
      'alumni': { name: 'Alumni', icon: <FaUserGraduate /> },
      'faculty': { name: 'Faculty', icon: <FaUserGraduate /> },
      'research': { name: 'Research', icon: <FaBook /> },
      'library': { name: 'Library', icon: <FaBook /> },
    };

    // Try to match the path
    if (breadcrumbMap[path]) {
      return breadcrumbMap[path];
    }

    // Handle dynamic routes (like /programs/:id)
    if (pathnames.includes('programs') && path !== 'programs') {
      return { name: path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), icon: <FaBook /> };
    }

    if (pathnames.includes('news') && path !== 'news') {
      return { name: path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), icon: <FaFileAlt /> };
    }

    // Default
    return { 
      name: path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
      icon: <FaFolder /> 
    };
  };

  // Generate breadcrumb items from URL
  const generateItemsFromPath = () => {
    const items = [];
    let accumulatedPath = '';

    pathnames.forEach((path, index) => {
      accumulatedPath += `/${path}`;
      const isLast = index === pathnames.length - 1;
      const info = getBreadcrumbInfo(path);

      items.push({
        path: accumulatedPath,
        name: info.name,
        icon: info.icon,
        active: isLast,
        isDynamic: pathnames.includes('programs') || pathnames.includes('news')
      });
    });

    return items;
  };

  // Use custom items if provided, otherwise generate from path
  const breadcrumbItems = customItems.length > 0 
    ? customItems 
    : generateItemsFromPath();

  // Add home if needed
  const itemsWithHome = showHome 
    ? [
        { 
          path: '/', 
          name: 'Home', 
          icon: <FaHome />, 
          active: false 
        },
        ...breadcrumbItems
      ]
    : breadcrumbItems;

  // Get current page title
  const currentPage = itemsWithHome[itemsWithHome.length - 1];

  return (
    <div className={`breadcrumb-container ${className}`}>
      <Container>
        <div className="breadcrumb-wrapper py-3">
          {/* Current Page Title */}
          <div className="current-page-title mb-2">
            <h1 className="h3 fw-bold text-primary mb-0">
              {currentPage.icon && (
                <span className="page-icon me-2">
                  {currentPage.icon}
                </span>
              )}
              {currentPage.name}
            </h1>
            {currentPage.description && (
              <p className="text-muted small mb-0 mt-1">
                {currentPage.description}
              </p>
            )}
          </div>

          {/* Breadcrumb Navigation */}
          <BootstrapBreadcrumb className="mb-0">
            {itemsWithHome.map((item, index) => {
              const isLast = index === itemsWithHome.length - 1;
              
              return (
                <BootstrapBreadcrumb.Item
                  key={index}
                  linkAs={isLast ? 'span' : Link}
                  linkProps={isLast ? {} : { to: item.path }}
                  active={item.active}
                  className={`breadcrumb-item ${item.active ? 'active' : ''}`}
                >
                  <span className="d-inline-flex align-items-center">
                    {item.icon && (
                      <span className="breadcrumb-icon me-2">
                        {item.icon}
                      </span>
                    )}
                    <span className="breadcrumb-text">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="breadcrumb-badge ms-2">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </BootstrapBreadcrumb.Item>
              );
            })}
          </BootstrapBreadcrumb>

          {/* Quick Actions */}
          {currentPage.actions && (
            <div className="breadcrumb-actions mt-3">
              <div className="d-flex flex-wrap gap-2">
                {currentPage.actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`btn btn-sm ${action.variant || 'outline-primary'}`}
                    target={action.target || '_self'}
                    rel={action.rel || 'noopener noreferrer'}
                  >
                    {action.icon && <span className="me-2">{action.icon}</span>}
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Breadcrumb Trail */}
          <div className="breadcrumb-trail mt-2">
            <small className="text-muted">
              You are here: 
              {itemsWithHome.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ' › '}
                  {item.active ? (
                    <span className="fw-semibold">{item.name}</span>
                  ) : (
                    <Link to={item.path} className="text-muted text-decoration-none">
                      {item.name}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </small>
          </div>
        </div>
      </Container>

      {/* Divider */}
      <div className="breadcrumb-divider" />
    </div>
  );
};

// Higher Order Component for pages that need breadcrumbs
export const withBreadcrumb = (WrappedComponent, breadcrumbProps = {}) => {
  return (props) => (
    <>
      <Breadcrumb {...breadcrumbProps} />
      <WrappedComponent {...props} />
    </>
  );
};

// Hook for programmatic breadcrumb updates
export const useBreadcrumb = (items = []) => {
  const location = useLocation();
  
  const updateBreadcrumb = (newItems) => {
    // This would typically update a context or state
    console.log('Updating breadcrumb with:', newItems);
  };

  const clearBreadcrumb = () => {
    updateBreadcrumb([]);
  };

  const addBreadcrumbItem = (item) => {
    updateBreadcrumb([...items, item]);
  };

  return {
    items,
    updateBreadcrumb,
    clearBreadcrumb,
    addBreadcrumbItem,
    currentPath: location.pathname
  };
};

export default Breadcrumb;