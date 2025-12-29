import React, { useState } from 'react';
import '../App.css';

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 

  const handleRegister = async (e) => {
    e.preventDefault(); 
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered successfully! You are now logged in.");
        console.log("User ID:", data.userId);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="form-container">
       <div className="form-box">
        <h2>Create Account</h2>

        {}
        {message && <p className="message-text">{message}</p>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              onChange={(e) => setUsername(e.target.value)} 
              value={username}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Choose a password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
            />
          </div>
          <button className="submit-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;