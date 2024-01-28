import React from 'react';
import { Link } from 'react-router-dom';
import '../componentStyles/Navbar.css';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src=" /logo.jpg" alt="Pizza" />
        <Link to="/" >Doughlicious</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <React.Fragment>
            <li>
              <Link to="/pizzaorder">Order Your Pizza</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
