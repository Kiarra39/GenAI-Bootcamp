import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MindMap from "../components/MindMap";
import "../components/MindMap.css";
import "./MindMapPage.css";

export default function MindMapPage() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/notes");
  };

  return (
    <div className="mindmap-page">
      {/* Top Navbar */}
      <header className="mindmap-header">
        <h1 className="mindmap-title">🧠 MindMap Generator</h1>
        <button className="back-btn" onClick={handleBack}>
          ← Back to Notes
        </button>
      </header>

      {/* Content */}
      <main className="mindmap-content">
        {!noteId ? (
          <div className="no-note">
            <p>⚠️ No note selected. Please select a note to generate a MindMap.</p>
            <button onClick={handleBack}>Go Back</button>
          </div>
        ) : (
          <MindMap noteId={noteId} />
        )}
      </main>
    </div>
  );
}
