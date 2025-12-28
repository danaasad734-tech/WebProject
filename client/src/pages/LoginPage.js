import React from 'react';
import '../App.css'; // We will add styles next
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

     try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include", // important for session cookies
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
}

function LoginPage() {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="submit-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 