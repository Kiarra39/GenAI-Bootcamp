// src/pages/NotePage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import MindMap from "../components/MindMap";
import FileUpload from "../components/FileUpload";
import "./NotePage.css";

export default function NotePage() {
  const { id: noteId } = useParams();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const saveTimer = useRef(null);

  // Fetch note data
  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/notes/${noteId}`);
      setNote(res.data);
      setContent(res.data.content || "");
      if (res.data.aiSummary?.text) setSummary(res.data.aiSummary.text);
      setLoading(false);
    } catch (err) {
      setError("Failed to load note");
      setLoading(false);
    }
  };

  // Fetch mindmap nodes
  const fetchNodes = async () => {
    try {
      const res = await api.get(`/nodes/${noteId}`);
      setNodes(res.data);
    } catch (err) {
      console.log("No nodes yet");
    }
  };

  useEffect(() => {
    fetchNote();
    fetchNodes();
  }, [noteId]);

  // Auto-save logic (debounced)
  const autoSave = async (updatedContent) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        setSaving(true);
        await api.put(`/notes/${noteId}`, { content: updatedContent });
        setSaving(false);
      } catch {
        setSaving(false);
      }
    }, 2000);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    autoSave(newContent);
  };

  // Generate AI summary
  const handleGenerateSummary = async () => {
    try {
      setSummary("Generating summary...");
      const res = await api.post(`/ai/summary/${noteId}`);
      setSummary(res.data.body || res.data.summary || "Summary generated!");
    } catch (err) {
      setSummary("Error generating summary.");
    }
  };

  // Generate Mindmap
  const handleGenerateMindmap = async () => {
    try {
      const res = await api.post(`/ai/nodes/${noteId}`);
      const nodeData = res.data.data?.content;
      if (nodeData) {
        setNodes(JSON.parse(nodeData));
      }
    } catch (err) {
      console.error("Error generating mindmap");
    }
  };

  if (loading) return <p className="loading-text">Loading note...</p>;

  return (
    <div className="notepage-container">
      <Navbar />

      <div className="notepage-content">
        <h1 className="note-title">{note?.title}</h1>

        <div className="editor-section">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your note here..."
          />
          {saving && <p className="autosave-text">Saving...</p>}
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={handleGenerateSummary}>
            🧠 Generate Summary
          </button>
          <button className="btn btn-secondary" onClick={handleGenerateMindmap}>
            🕸️ Generate Mindmap
          </button>
        </div>

        <div className="ai-section">
          <div className="summary-section">
            <h2>AI Summary</h2>
            <div className="summary-box">
              {summary ? <p>{summary}</p> : <p>No summary yet.</p>}
            </div>
          </div>

          <div className="mindmap-section">
            <h2>Mindmap</h2>
            {nodes.length > 0 ? (
              <MindMap nodes={nodes} />
            ) : (
              <p className="no-mindmap">No mindmap generated yet.</p>
            )}
          </div>
        </div>

        <div className="upload-section">
          <h3>Upload Related File</h3>
          <FileUpload noteId={noteId} />
        </div>
      </div>
    </div>
  );
}
