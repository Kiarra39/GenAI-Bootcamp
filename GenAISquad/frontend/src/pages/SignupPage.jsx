// src/pages/SignupPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"; // Import the CSS file

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Placeholder signup logic
    navigate("/login"); // Redirect after signup
  };

  return (
    <div className="signup-page">
      {/* Header Text */}
      <div className="signup-header">
        <h1>
          Join <span className="brand">MindMapAI</span> Today!
        </h1>
        <p>Create an account to start organizing your notes smarter.</p>
      </div>

      {/* Signup Card */}
      <div className="signup-card">
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
        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label>Username :</label>
            <input type="text" required />
          </div>

          <div className="form-group">
            <label>Email :</label>
            <input type="email" required />
          </div>

          <div className="form-group">
            <label>Password :</label>
            <input type="password" required />
          </div>

          <div className="form-group">
            <label>Confirm Password :</label>
            <input type="password" required />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        {/* Footer link */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login →</span>
        </p>
      </div>
    </div>
  );
}
