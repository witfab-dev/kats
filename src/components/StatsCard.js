import React from 'react';
import { Card } from 'react-bootstrap';
import CountUp from 'react-countup';
import { IconType } from 'react-icons';
import './StatsCard.css';

const StatsCard = ({ 
  icon: Icon,
  value,
  label,
  color = 'primary',
  suffix = '',
  prefix = '',
  duration = 2.5,
  description,
  trend,
  trendValue,
  className = ''
}) => {
  
  const getColorClass = () => {
    const colors = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      danger: 'text-danger',
      warning: 'text-warning',
      info: 'text-info',
      dark: 'text-dark'
    };
    return colors[color] || colors.primary;
  };

  const getBgColor = () => {
    const colors = {
      primary: 'bg-primary-light',
      secondary: 'bg-secondary-light',
      success: 'bg-success-light',
      danger: 'bg-danger-light',
      warning: 'bg-warning-light',
      info: 'bg-info-light',
      dark: 'bg-dark-light'
    };
    return colors[color] || colors.primary;
  };

  const formatValue = (val) => {
    if (typeof val === 'string') {
      if (val.includes('+') || val.includes('%')) {
        return val;
      }
      // Try to extract number from string
      const num = parseFloat(val.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? val : num;
    }
    return val;
  };

  const shouldAnimate = () => {
    const val = formatValue(value);
    return typeof val === 'number';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch(trend) {
      case 'up':
        return <i className="bi bi-arrow-up-circle-fill text-success ms-2"></i>;
      case 'down':
        return <i className="bi bi-arrow-down-circle-fill text-danger ms-2"></i>;
      case 'stable':
        return <i className="bi bi-dash-circle-fill text-warning ms-2"></i>;
      default:
        return null;
    }
  };

  const getTrendText = () => {
    if (!trendValue) return '';
    
    switch(trend) {
      case 'up':
        return `↑ ${trendValue} from last year`;
      case 'down':
        return `↓ ${trendValue} from last year`;
      case 'stable':
        return `→ No change`;
      default:
        return '';
    }
  };

  return (
    <Card className={`stats-card border-0 shadow-sm h-100 ${className}`}>
      <Card.Body className="d-flex flex-column p-4">
        <div className="stats-header d-flex justify-content-between align-items-start mb-3">
          <div className={`icon-container ${getBgColor()} rounded-circle p-3`}>
            {typeof Icon === 'function' ? (
              <Icon size={28} className={getColorClass()} />
            ) : (
              <div className={`icon-display ${getColorClass()}`} style={{ fontSize: '28px' }}>
                {Icon}
              </div>
            )}
          </div>
          
          {trend && (
            <div className="trend-indicator">
              {getTrendIcon()}
            </div>
          )}
        </div>
        
        <div className="stats-content flex-grow-1">
          <div className="stats-value mb-2">
            <h2 className={`fw-bold mb-0 ${getColorClass()}`}>
              {shouldAnimate() ? (
                <CountUp
                  start={0}
                  end={formatValue(value)}
                  duration={duration}
                  separator=","
                  prefix={prefix}
                  suffix={suffix}
                  decimals={value?.toString().includes('.') ? 1 : 0}
                />
              ) : (
                <>
                  {prefix}{value}{suffix}
                </>
              )}
            </h2>
          </div>
          
          <Card.Title as="h5" className="fw-semibold mb-2 text-dark">
            {label}
          </Card.Title>
          
          {description && (
            <Card.Text className="text-muted small mb-3">
              {description}
            </Card.Text>
          )}
          
          {trend && (
            <div className="trend-info">
              <small className={`fw-medium d-flex align-items-center ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-warning'}`}>
                {getTrendText()}
              </small>
            </div>
          )}
        </div>
        
        <div className="stats-footer mt-3 pt-3 border-top">
          <div className="progress" style={{ height: '4px' }}>
            <div 
              className={`progress-bar ${color === 'primary' ? 'bg-primary' : `bg-${color}`}`}
              style={{ width: '100%' }}
              role="progressbar"
            />
          </div>
          <small className="text-muted mt-2 d-block">
            Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </small>
        </div>
      </Card.Body>
      
      {/* Hover Effect */}
      <div className="stats-hover-effect">
        <div className="effect-circle effect-1" />
        <div className="effect-circle effect-2" />
        <div className="effect-circle effect-3" />
      </div>
    </Card>
  );
};

export default StatsCard;