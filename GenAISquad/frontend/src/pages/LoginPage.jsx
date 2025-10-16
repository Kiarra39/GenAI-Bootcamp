// src/pages/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder login logic
    navigate("/upload"); // Redirect after login
  };

  return (
    <div className="login-page">
      {/* Header Text */}
      <div className="login-header">
        <h1>
          Welcome back to <span className="brand">MindMapAI</span>!
        </h1>
        <p>Log in to continue organizing your notes.</p>
      </div>

      {/* Login Card */}
      <div className="login-card">
        {/* Profile Icon */}
        <div className="profile-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="profile-svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username :</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input type="password" required />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Footer link */}
        <p className="signup-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up →</span>
        </p>
      </div>
    </div>
  );
}
