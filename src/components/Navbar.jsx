import React, { useState } from 'react';

export default function Navbar({ onNavigateHome }) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileHomeClick = () => {
    onNavigateHome();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <button onClick={onNavigateHome} className="navbar-home-button">
          <span className="navbar-logo-top">Inter IIT</span><br />
          <span className="navbar-logo-bottom-blue">Sports</span><span className="navbar-logo-bottom-red">Meet</span>
          </button>
        </div>

        <div className="navbar-links">
            <a onClick={onNavigateHome} href='#'>Home</a>
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
        </div>
        
        <button 
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <nav className="mobile-menu-links">
            <a onClick={onNavigateHome} href='#'>Home</a>
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
          </nav>
        </div>
      )}
    </>
  );
}

