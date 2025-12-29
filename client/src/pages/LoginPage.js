import React, { useState } from 'react';
import '../App.css'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://webproject-ziky.onrender.com/api/auth/login", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Logged in successfully!");
        console.log("User ID:", data.userId);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Welcome Back</h2>
        
        {}
        {message && <p className="message-text">{message}</p>}

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
            />
          </div>

          <button className="submit-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;