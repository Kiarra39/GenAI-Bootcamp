import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>
          Welcome to <span className="brand">MindMapAI</span>
        </h1>
        <p>
          An AI-powered study assistant that helps you take notes, generate mind maps,
          and organize tasks — all in one place.
        </p>

        <div className="button-group">
          <button onClick={() => navigate("/register")} className="btn-primary">
            Get Started
          </button>
          <button onClick={() => navigate("/login")} className="btn-secondary">
            Login
          </button>
          <button onClick={() => navigate("/profile")} className="btn-secondary">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
