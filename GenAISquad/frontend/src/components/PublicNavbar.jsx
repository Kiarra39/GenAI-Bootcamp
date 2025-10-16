import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./PublicNavbar.css";

export default function PublicNavbar() {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  // Hide Navbar on protected routes
  const hideOn = ["/profile", "/notes", "/tasks", "/mindmap"];
  const isHidden = hideOn.some((p) => location.pathname.startsWith(p));

  if (isHidden) return null;

  return (
    <nav className={`public-navbar ${isAuthPage ? "compact" : ""}`}>
      <div className="nav-container">
        <h1 className="brand">
          <Link to="/">MindMap<span>AI</span></Link>
        </h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
