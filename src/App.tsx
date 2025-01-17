import { useState } from 'react';
import './App.css';

interface GuestMessage {
  name: string;
  message: string;
  date: Date;
}

interface RSVPForm {
  name: string;
  email: string;
  attending: boolean;
  numberOfGuests: number;
  mealPreference: 'vegetarian' | 'non-vegetarian' | 'vegan';
  dietaryRestrictions: string;
  songRequest: string;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [rsvpForm, setRsvpForm] = useState<RSVPForm>({
    name: '',
    email: '',
    attending: true,
    numberOfGuests: 1,
    mealPreference: 'non-vegetarian',
    dietaryRestrictions: '',
    songRequest: ''
  });

  const weddingDate = new Date('2026-03-28');
  const today = new Date();
  const timeUntil = weddingDate.getTime() - today.getTime();
  const daysUntil = Math.ceil(timeUntil / (1000 * 60 * 60 * 24));

  const timeline = [
    { date: 'November 2020', event: 'First Met' },
    { date: 'February 2021', event: 'Started Dating' },
    { date: 'June 2024', event: 'Got Engaged' },
    { date: 'March 2026', event: 'Getting Married!' }
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('RSVP Submitted:', rsvpForm);
  };

  const handleGuestMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMessage: GuestMessage = {
      name: formData.get('name') as string,
      message: formData.get('message') as string,
      date: new Date()
    };
    setGuestMessages([...guestMessages, newMessage]);
    e.currentTarget.reset();
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
          <button onClick={() => handleNavClick('gallery')}>Gallery</button>
          <button onClick={() => handleNavClick('rsvp')}>RSVP</button>
          <button onClick={() => handleNavClick('registry')}>Registry</button>
          <button onClick={() => handleNavClick('travel')}>Travel & Stay</button>
          <button onClick={() => handleNavClick('guestbook')}>Guest Book</button>
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
            <div className="timeline">
              <h2>Our Journey</h2>
              <div className="timeline-events">
                {timeline.map((event, index) => (
                  <div key={index} className="timeline-event">
                    <div className="timeline-date">{event.date}</div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-description">{event.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'gallery' && (
          <section className="gallery-section">
            <h2>Our Photos</h2>
            <div className="photo-grid">
              {/* Add your photo components here */}
              <div className="photo-placeholder">Upload your favorite photos</div>
              <div className="photo-placeholder">Engagement Photos</div>
              <div className="photo-placeholder">Our Adventures</div>
            </div>
          </section>
        )}

        {activeSection === 'rsvp' && (
          <section className="rsvp-section">
            <h2>RSVP</h2>
            <form onSubmit={handleRSVPSubmit} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={rsvpForm.name}
                  onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={rsvpForm.email}
                  onChange={e => setRsvpForm({...rsvpForm, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Will you be attending?</label>
                <select
                  value={rsvpForm.attending ? 'yes' : 'no'}
                  onChange={e => setRsvpForm({...rsvpForm, attending: e.target.value === 'yes'})}
                >
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>
              {rsvpForm.attending && (
                <>
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input
                      type="number"
                      id="guests"
                      min="1"
                      max="4"
                      value={rsvpForm.numberOfGuests}
                      onChange={e => setRsvpForm({...rsvpForm, numberOfGuests: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Meal Preference</label>
                    <select
                      value={rsvpForm.mealPreference}
                      onChange={e => setRsvpForm({...rsvpForm, mealPreference: e.target.value as any})}
                    >
                      <option value="non-vegetarian">Non-Vegetarian</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dietary">Dietary Restrictions</label>
                    <textarea
                      id="dietary"
                      value={rsvpForm.dietaryRestrictions}
                      onChange={e => setRsvpForm({...rsvpForm, dietaryRestrictions: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="song">Song Request</label>
                    <input
                      type="text"
                      id="song"
                      placeholder="What song will get you on the dance floor?"
                      value={rsvpForm.songRequest}
                      onChange={e => setRsvpForm({...rsvpForm, songRequest: e.target.value})}
                    />
                  </div>
                </>
              )}
              <button type="submit" className="submit-button">
                Submit RSVP
              </button>
            </form>
          </section>
        )}

        {activeSection === 'guestbook' && (
          <section className="guestbook-section">
            <h2>Guest Book</h2>
            <form onSubmit={handleGuestMessage} className="guestbook-form">
              <div className="form-group">
                <label htmlFor="guestName">Your Name</label>
                <input type="text" id="guestName" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="guestMessage">Your Message</label>
                <textarea id="guestMessage" name="message" required />
              </div>
              <button type="submit" className="submit-button">
                Leave a Message
              </button>
            </form>
            <div className="guestbook-messages">
              {guestMessages.map((msg, index) => (
                <div key={index} className="guestbook-message">
                  <h3>{msg.name}</h3>
                  <p>{msg.message}</p>
                  <small>{msg.date.toLocaleDateString()}</small>
                </div>
              ))}
            </div>
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

        {activeSection === 'registry' && (
          <section className="registry-section">
            <h2>Registry</h2>
            <p>We're honored to have you celebrate with us. Here's where we're registered:</p>
            <div className="registry-links">
              <a href="#" className="registry-card">
                <h3>Amazon</h3>
                <p>View our Amazon Registry</p>
              </a>
              <a href="#" className="registry-card">
                <h3>Target</h3>
                <p>View our Target Registry</p>
              </a>
              <a href="#" className="registry-card">
                <h3>Honeymoon Fund</h3>
                <p>Contribute to our Honeymoon</p>
              </a>
            </div>
          </section>
        )}

        {activeSection === 'travel' && (
          <section className="travel-section">
            <h2>Travel & Accommodations</h2>
            <div className="accommodations">
              <h3>Recommended Hotels</h3>
              <div className="hotel-cards">
                {/* Add hotel cards here */}
              </div>
              
              <h3>Getting Here</h3>
              <div className="travel-info">
                <div className="map-placeholder">
                  {/* Add Google Maps integration here */}
                  [Google Maps will be integrated here]
                </div>
                <div className="directions">
                  <h4>From the Airport</h4>
                  <p>[Directions from airport]</p>
                  
                  <h4>Parking Information</h4>
                  <p>[Parking details]</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
