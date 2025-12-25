import React from 'react';
import '../App.css'; // Reuse the styles!

function RegisterPage() {
  return (
    <div className="form-container">
       <div className="form-box">
        <h2>Create Account</h2>
        <form>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Choose a password" />
          </div>
          <button className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;