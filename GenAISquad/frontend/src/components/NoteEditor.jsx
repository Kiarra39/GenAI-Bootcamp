import React, { useState, useEffect } from "react";
import "./NoteEditor.css";
import api from "../api/axios";

export default function NoteEditor({ noteId }) {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditMode, setIsEditMode] = useState(true);

  // Fetch note content
  useEffect(() => {
    if (noteId) {
      api.get(`/api/notes/single/${noteId}`).then((res) => {
        setContent(res.data.content || "");
        setSummary(res.data.summary || "");
      });
    }
  }, [noteId]);

  // Save note
  const handleSave = async () => {
    await api.put(`/api/notes/${noteId}`, { content });
    alert("Note saved successfully!");
  };

  // Generate AI summary
  const handleSummary = async () => {
    const res = await api.post(`/api/notes/${noteId}/summary`);
    setSummary(res.data.summary);
  };

  return (
    <div className="note-editor">
      <div className="editor-toolbar">
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? "👓 Read Mode" : "✍️ Edit Mode"}
        </button>
        <button onClick={handleSave}>💾 Save Changes</button>
        <button onClick={handleSummary}>🤖 Generate Summary</button>
      </div>

      <div className="editor-area">
        {isEditMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="preview-box">{content || "No content yet."}</div>
        )}
      </div>

      {summary && (
        <div className="summary-section">
          <h4>AI Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
