import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import NoteEditor from "../components/NoteEditor";
import MindMap from "../components/MindMap";
import "./NoteDetailPage.css";

export default function NoteDetailPage() {
  const { id } = useParams(); // note id
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [renaming, setRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchNote() {
    setLoading(true);
    try {
      const res = await api.get(`/api/notes/single/${id}`);
      setNote(res.data);
      setNewTitle(res.data.title || "");
    } catch (err) {
      console.error("Failed to load note:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleRename = async () => {
    if (!newTitle.trim()) return;
    try {
      await api.put(`/api/notes/${id}`, { title: newTitle.trim() });
      setRenaming(false);
      await fetchNote();
    } catch (err) {
      console.error("Rename failed:", err);
      alert("Rename failed. See console.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    try {
      await api.delete(`/api/notes/${id}`);
      // go back to profile / notes list
      navigate(-1);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. See console.");
    }
  };

  if (loading) {
    return <div className="note-detail-page"><p>Loading note...</p></div>;
  }

  if (!note) {
    return (
      <div className="note-detail-page">
        <p>Note not found.</p>
        <button onClick={() => navigate(-1)} className="btn-secondary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="note-detail-page">
      <div className="note-topbar">
        <div className="note-breadcrumbs">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="meta">
            <span className="note-folder">{note.folderTitle || note.folder || "Folder"}</span>
            <span className="dot">•</span>
            <span className="note-date">{new Date(note.updatedAt || note.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="note-actions">
          {renaming ? (
            <>
              <input
                className="rename-input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button className="btn" onClick={handleRename}>Save</button>
              <button className="btn-alt" onClick={() => { setRenaming(false); setNewTitle(note.title || ""); }}>Cancel</button>
            </>
          ) : (
            <>
              <h2 className="note-title">{note.title || "Untitled Note"}</h2>
              <button className="btn" onClick={() => setRenaming(true)}>✏️ Rename</button>
              <button className="btn-alt" onClick={handleDelete}>🗑️ Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="note-body">
        <section className="editor-section">
          <h3>Editor</h3>
          <NoteEditor noteId={id} />
        </section>

        <section className="mindmap-section">
          <h3>Mind Map</h3>
          <MindMap noteId={id} />
        </section>
      </div>
    </div>
  );
}
