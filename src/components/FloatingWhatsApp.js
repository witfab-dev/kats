import React from 'react';
import { Button } from 'react-bootstrap';
import { FaWhatsapp, FaComment, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const FloatingWhatsApp = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Main WhatsApp Button */}
      <Button
        variant="success"
        className="floating-whatsapp shadow-lg"
        href="https://wa.me/250788416574"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setExpanded(!expanded)}
        aria-label="Contact via WhatsApp"
      >
        {expanded ? <FaTimes size={24} /> : <FaWhatsapp size={30} />}
      </Button>

      {/* Expanded Chat Options */}
      {expanded && (
        <div className="floating-chat-options">
          <div className="chat-option">
            <a 
              href="https://wa.me/250788416574?text=Hello%20KATSS%2C%20I%20would%20like%20more%20information%20about%20admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaComment className="me-2" />
              Admission Inquiry
            </a>
          </div>
          <div className="chat-option">
            <a 
              href="https://wa.me/250788416574?text=Hello%20KATSS%2C%20I%20have%20a%20question%20about%20programs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaComment className="me-2" />
              Program Questions
            </a>
          </div>
          <div className="chat-option">
            <a 
              href="https://wa.me/250788416574?text=Hello%20KATSS%2C%20I%20need%20fee%20structure%20information"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <FaComment className="me-2" />
              Fee Structure
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingWhatsApp;