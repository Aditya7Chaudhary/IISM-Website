import React, { useState } from 'react';

// This component receives a prop `onNavigateToRegister` from App.jsx
// to make the "REGISTER NOW" button work.
export default function HomePage({ onNavigateToRegister }) {
  // --- THIS IS THE LOGIC ---
  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- NEW ---
  // Function to handle clicking the register button from the mobile menu
  const handleMobileRegisterClick = () => {
    onNavigateToRegister();
    setIsMobileMenuOpen(false); // Close menu after click
  };
  
  return (
    // The 'homepage-with-background-image' class is in App.css
    // It's what sets your background image.
    <div className="homepage homepage-with-background-image">
      
      {/* --- 1. Navbar (White background) --- */}
      <header className="home-navbar home-navbar-white">
        <div className="home-logo">
          {/* This assumes 'logo_2.webp' is in your /public folder */}
          <img 
            src="/logo_2.png" 
            alt="Inter IIT SportsMeet Logo" 
            className="home-logo-image" // This uses your 100px height style
          />
        </div>

        {/* --- DESKTOP NAV LINKS (hidden on mobile) --- */}
        <nav className="home-nav-links home-nav-links-dark">
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
        </nav>
        
        {/* --- THIS IS THE HAMBURGER BUTTON --- */}
        <button 
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          {/* Simple SVG for the hamburger icon (dark stroke) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#002147" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* --- 2. Hero Section (Centered over background image) --- */}
      <main className="home-hero-centered">
        {/* This div uses your 'color: black' style from your CSS */ }
        <div className="home-hero-content-centered"> 
          <h1>Unleash Your Potential</h1>
          <p>Join the Inter IIT Sports Meet 2025</p>
          
          <button className="home-hero-button" onClick={onNavigateToRegister}>
            REGISTER NOW
          </button>
          
          <span>Sign up to compete, connect, and make history.</span>
        </div>
      </main>
      
      {/* --- THIS IS THE "SIDE PANEL" OVERLAY --- */}
      {/* This only appears if isMobileMenuOpen is true */}
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
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
            {/* Special link to the register page */}
            <button className="mobile-menu-register-btn" onClick={handleMobileRegisterClick}>
              REGISTER NOW
            </button>
          </nav>
        </div>
      )}

    </div>
  );
}

