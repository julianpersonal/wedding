import { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const weddingDate = new Date('2026-03-28');
  const today = new Date();
  const timeUntil = weddingDate.getTime() - today.getTime();
  const daysUntil = Math.ceil(timeUntil / (1000 * 60 * 60 * 24));

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="wedding-app">
      <nav className="wedding-nav">
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => handleNavClick('home')}>Home</button>
          <button onClick={() => handleNavClick('story')}>Our Story</button>
          <button onClick={() => handleNavClick('details')}>Event Details</button>
          <button onClick={() => handleNavClick('rsvp')}>RSVP</button>
          <button onClick={() => handleNavClick('registry')}>Registry</button>
          <button onClick={() => handleNavClick('travel')}>Travel & Stay</button>
        </div>
      </nav>

      <main className="wedding-content">
        {activeSection === 'home' && (
          <section className="home-section">
            <h1>Riki and Julian's Wedding</h1>
            <div className="countdown">
              <h2>{daysUntil} Days Until We Say "I Do"</h2>
              <p>March 28th, 2026</p>
            </div>
            {/* Add a beautiful hero image here */}
          </section>
        )}

        {activeSection === 'story' && (
          <section className="story-section">
            <h2>Our Story</h2>
            <p>[Your love story will go here]</p>
          </section>
        )}

        {activeSection === 'details' && (
          <section className="details-section">
            <h2>Wedding Details</h2>
            <div className="event-details">
              <h3>Ceremony</h3>
              <p>Date: March 28th, 2026</p>
              <p>Time: [Time TBD]</p>
              <p>Location: [Location TBD]</p>
              
              <h3>Reception</h3>
              <p>Following the ceremony</p>
              <p>Location: [Location TBD]</p>
            </div>
          </section>
        )}

        {activeSection === 'rsvp' && (
          <section className="rsvp-section">
            <h2>RSVP</h2>
            <p>Please let us know if you'll be joining us in celebrating our special day.</p>
            {/* RSVP form will go here */}
          </section>
        )}

        {activeSection === 'registry' && (
          <section className="registry-section">
            <h2>Registry</h2>
            <p>We're honored to have you celebrate with us. Here's where we're registered:</p>
            {/* Registry links will go here */}
          </section>
        )}

        {activeSection === 'travel' && (
          <section className="travel-section">
            <h2>Travel & Accommodations</h2>
            <div className="accommodations">
              <h3>Recommended Hotels</h3>
              {/* Hotel recommendations will go here */}
              
              <h3>Getting Here</h3>
              {/* Travel information will go here */}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
