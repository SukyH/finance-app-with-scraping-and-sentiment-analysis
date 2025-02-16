import React from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Financial Literacy</h1>
      
      {/* About Us Section */}
      <section>
        <h2>About Us</h2>
        <p>
          We are committed to making financial literacy accessible, engaging, and fun! 
          Our mission is to equip high school students (and possibly university students) with 
          the knowledge they need to navigate the world of personal finance.
        </p>
      </section>
      
     
      <section>
        <h2>Our Vision</h2>
        <p>
          Our goal is to create a financially literate generation, where individuals are empowered 
          to make informed decisions about their financial future.
        </p>
      </section>

      {/* Links to other pages */}
      <div className="nav-links">
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/volunteer">Volunteer</Link>
        <Link to="/school-partner">Become a School Partner</Link>
        <Link to="/feedback">Feedback</Link> 
        <Link to="/curated-info">Curated Info</Link> 
      </div>
    </div>
  );
};

export default HomePage;
