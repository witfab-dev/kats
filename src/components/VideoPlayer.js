import React, { useState, useRef, useEffect } from 'react';
import { Button, ProgressBar, Container } from 'react-bootstrap';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress, FaStepForward, FaStepBackward } from 'react-icons/fa';
import './VideoPlayer.css';

const VideoPlayer = ({ src, title, poster, autoPlay = false, controls = true }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Play/Pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Volume control
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Seek video
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Skip forward/backward
  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Change playback speed
  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setLoading(false);
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e) => {
      setError('Failed to load video. Please try again.');
      setLoading(false);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Auto-hide controls
    let controlsTimeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeout);
      controlsTimeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      clearTimeout(controlsTimeout);
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
        case '>':
        case '.':
          e.preventDefault();
          changePlaybackRate(Math.min(playbackRate + 0.25, 4));
          break;
        case '<':
        case ',':
          e.preventDefault();
          changePlaybackRate(Math.max(playbackRate - 0.25, 0.25));
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [playbackRate]);

  if (error) {
    return (
      <div className="video-player-error text-center p-5">
        <div className="error-icon mb-3">
          <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem', color: '#dc3545' }}></i>
        </div>
        <h5 className="text-danger mb-3">{error}</h5>
        <Button variant="outline-primary" onClick={() => window.location.reload()}>
          Reload Video
        </Button>
      </div>
    );
  }

  return (
    <div 
      className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`} 
      ref={containerRef}
    >
      <div className="video-wrapper position-relative">
        {loading && (
          <div className="video-loading-overlay">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading video...</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="video-element"
          src={src}
          poster={poster}
          onClick={togglePlay}
          autoPlay={autoPlay}
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>

        {controls && (
          <div className={`video-controls ${showControls ? 'visible' : 'hidden'}`}>
            {/* Progress Bar */}
            <div className="progress-container">
              <input
                type="range"
                className="progress-bar"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                style={{
                  background: `linear-gradient(to right, var(--color-primary) ${(currentTime / duration) * 100}%, #ccc ${(currentTime / duration) * 100}%)`
                }}
              />
              <div className="time-display d-flex justify-content-between mt-1">
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="controls-bottom d-flex justify-content-between align-items-center p-3">
              <div className="left-controls d-flex align-items-center gap-3">
                <Button variant="link" className="p-0" onClick={togglePlay}>
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </Button>
                
                <Button variant="link" className="p-0" onClick={() => skip(-10)}>
                  <FaStepBackward size={18} />
                  <span className="ms-1">10s</span>
                </Button>
                
                <Button variant="link" className="p-0" onClick={() => skip(10)}>
                  <FaStepForward size={18} />
                  <span className="ms-1">10s</span>
                </Button>

                {/* Volume Control */}
                <div className="volume-control d-flex align-items-center gap-2">
                  <Button variant="link" className="p-0" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>

                <div className="time-display-mobile d-none d-md-block">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="right-controls d-flex align-items-center gap-3">
                {/* Playback Speed */}
                <div className="playback-speed dropdown">
                  <button
                    className="btn btn-sm btn-outline-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {playbackRate}x
                  </button>
                  <ul className="dropdown-menu">
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(rate => (
                      <li key={rate}>
                        <button
                          className={`dropdown-item ${playbackRate === rate ? 'active' : ''}`}
                          onClick={() => changePlaybackRate(rate)}
                        >
                          {rate}x
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quality Selector */}
                <div className="quality-selector dropdown">
                  <button
                    className="btn btn-sm btn-outline-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {quality}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => setQuality('auto')}>
                        Auto
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setQuality('1080p')}>
                        1080p
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setQuality('720p')}>
                        720p
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => setQuality('480p')}>
                        480p
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Fullscreen Button */}
                <Button variant="link" className="p-0" onClick={toggleFullscreen}>
                  {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Video Title */}
        {title && (
          <div className="video-title-overlay">
            <h5 className="mb-0">{title}</h5>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="video-shortcuts mt-3">
        <details>
          <summary className="text-muted small">Keyboard shortcuts</summary>
          <div className="shortcuts-list mt-2">
            <div className="row">
              <div className="col-6 col-md-3">
                <kbd>Space</kbd> or <kbd>K</kbd> - Play/Pause
              </div>
              <div className="col-6 col-md-3">
                <kbd>M</kbd> - Mute
              </div>
              <div className="col-6 col-md-3">
                <kbd>F</kbd> - Fullscreen
              </div>
              <div className="col-6 col-md-3">
                <kbd>←</kbd> / <kbd>→</kbd> - Skip 10s
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default VideoPlayer;