import React from 'react';
import '../App.css'; // Reuse the styles!
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
    e.preventDefault(); // stop page reload
    
       try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        credentials: "include", // important for session cookies
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
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Choose a password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="submit-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;