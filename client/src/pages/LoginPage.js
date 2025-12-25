import React from 'react';
import '../App.css'; // We will add styles next

function LoginPage() {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Welcome Back</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 