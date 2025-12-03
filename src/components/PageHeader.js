import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="header">
      <h1>My Web Project</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Header;