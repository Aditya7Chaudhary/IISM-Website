import React, { useState } from 'react';
export default function HomePage({ onNavigateToRegister }) {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleMobileRegisterClick = () => {
    onNavigateToRegister();
    setIsMobileMenuOpen(false);
  };
  
  return (
    <div className="homepage homepage-with-background-image">
      <header className="home-navbar home-navbar-white">
        <div className="home-logo">
          <img 
            src="/logo_2.png" 
            alt="Inter IIT SportsMeet Logo" 
            className="home-logo-image"
          />
        </div>

        <nav className="home-nav-links home-nav-links-dark">
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
        </nav>

        <button 
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#002147" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <main className="home-hero-centered">
        <div className="home-hero-content-centered"> 
          <h1>Unleash Your Potential</h1>
          <p>Join the Inter IIT Sports Meet 2025</p>
          
          <button className="home-hero-button" onClick={onNavigateToRegister}>
            REGISTER NOW
          </button>
          
          <span>Sign up to compete, connect, and make history.</span>
        </div>
      </main>

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
            <a href="#">About</a>
            <a href="#">Sports</a>
            <a href="#">Gallery</a>
            <a href="#">Contact Us</a>
            <button className="mobile-menu-register-btn" onClick={handleMobileRegisterClick}>
              REGISTER NOW
            </button>
          </nav>
        </div>
      )}

    </div>
  );
}

