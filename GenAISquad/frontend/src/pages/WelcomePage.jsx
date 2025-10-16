import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="welcome-page">
      {/* Animated background shapes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className={`shape shape-${i + 1}`}></div>
      ))}

      {/* Main content card */}
      <div className="welcome-card">
        <h1>
          Welcome to <span className="brand">MindMapAI</span>
        </h1>
        <h2>Learn Smarter. Think Visually.</h2>
        <p>
          Transform your notes, documents, and ideas into beautiful, structured mind maps
          powered by artificial intelligence. Visualize your thoughts like never before.
        </p>

        <div className="button-group">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Get Started →
          </button>
          <button className="btn-secondary" onClick={() => setShowModal(true)}>
            Learn More →
          </button>
        </div>
      </div>

      {/* Learn More Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h2>What is MindMapAI?</h2>
            <p>
              MindMapAI is an AI-driven tool that helps learners and professionals organize
              knowledge visually. Upload your content, and it generates:
            </p>
            <ul>
              <li>🧠 Dynamic mind maps</li>
              <li>📝 Smart summaries & notes</li>
              <li>✅ Task divisions for easier studying</li>
            </ul>
            <div className="modal-image">
              <img
                src="https://cdn.pixabay.com/photo/2020/02/05/19/59/mind-4820502_1280.jpg"
                alt="Mind map preview"
              />
            </div>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Try It Now →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
