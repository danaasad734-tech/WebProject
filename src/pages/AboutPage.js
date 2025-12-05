import React from 'react';
import '../App.css'; 

function AboutPage() {
  return (
    <div className="page-container">
      <div className="form-box" style={{ maxWidth: '600px', textAlign: 'left' }}>
        <h2 style={{ textAlign: 'center' }}>About Our Team</h2>
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          Web Applications Programming & Engineering Project
        </p>
        
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

        <h3>Our Team Members:</h3>
        <ul style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#2c3e50' }}>
          <li>
            <strong>Dana Mohammad Asad</strong> 
          </li>
          <li>
            <strong>Sara Naji Fraihat</strong> 
          </li>
          <li>
            <strong>Sarah Hamzeh Shammout</strong> 
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;