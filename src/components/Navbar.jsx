import React, { useState } from 'react';

export default function Navbar({ onNavigateHome }) {
  // --- THIS IS THE LOGIC ---
  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NEW ---
  // Function to handle clicking the home button from the mobile menu
  const handleMobileHomeClick = () => {
    onNavigateHome();
    setIsMobileMenuOpen(false); // Close menu after click
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
        
        {/* --- DESKTOP NAV LINKS (hidden on mobile) --- */}
        <div className="navbar-links">
            <a onClick={onNavigateHome} href='#'>Home</a>
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
        </div>
        
        {/* --- THIS IS THE HAMBURGER BUTTON --- */}
        <button 
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          {/* Simple SVG for the hamburger icon (white stroke) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>
      
      {/* --- THIS IS THE "SIDE PANEL" OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {/* Simple SVG for the 'X' icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <nav className="mobile-menu-links">
            {/* Special link to the home page */}
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

