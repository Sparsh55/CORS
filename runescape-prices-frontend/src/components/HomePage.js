// src/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/table');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Collaborative Trip Planner</h1>
        <p style={styles.quote}>“The world is a book and those who do not travel read only one page.” – Saint Augustine</p>
        <p style={styles.quote}>“Travel far enough, you meet yourself.” – David Mitchell</p>
        <button onClick={handleGetStarted} style={styles.button}>Get Started</button>
      </header>
      <section style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Plan Together</h2>
          <p style={styles.boxContent}>Collaborate with friends and family to plan the perfect trip.</p>
        </div>
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Explore New Destinations</h2>
          <p style={styles.boxContent}>Discover new places and create unforgettable memories.</p>
        </div>
        <div style={styles.box}>
          <h2 style={styles.boxTitle}>Seamless Planning</h2>
          <p style={styles.boxContent}>Organize your travel itinerary with ease and convenience.</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#333',
    padding: '20px',
    background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:"100vw"
  },
  header: {
    marginBottom: '50px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#fff',
  },
  quote: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    color: '#fff',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#e52e71',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  buttonHover: {
    backgroundColor: '#ff8a00',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '1200px',
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    margin: '10px',
    flex: '1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  boxTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  boxContent: {
    fontSize: '1rem',
  },
};

export default Homepage;
