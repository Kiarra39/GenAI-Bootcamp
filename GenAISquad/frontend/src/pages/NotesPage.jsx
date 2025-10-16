import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import FolderCard from "../components/FolderCard";
import "./NotesPage.css";

export default function NotesPage() {
  const [folders, setFolders] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [expandedFolder, setExpandedFolder] = useState(null);
  const [notesByFolder, setNotesByFolder] = useState({});
  const [loadingNotes, setLoadingNotes] = useState(false);
  const navigate = useNavigate();

  // Fetch folders on mount
  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await api.get("/api/folders");
      setFolders(res.data);
    } catch (err) {
      console.error("Failed to load folders:", err);
    }
  };

  const addFolder = async () => {
    if (!newTitle.trim()) return;
    await api.post("/api/folders", { title: newTitle });
    setNewTitle("");
    fetchFolders();
  };

  const deleteFolder = async (folder) => {
    await api.delete(`/api/folders/${folder._id}`);
    fetchFolders();
  };

  const editFolder = async (folder) => {
    const newName = prompt("Rename folder:", folder.title);
    if (newName && newName !== folder.title) {
      await api.put(`/api/folders/${folder._id}`, { title: newName });
      fetchFolders();
    }
  };

  const toggleFavorite = async (folder) => {
    const updated = { ...folder, isFavorite: !folder.isFavorite };
    await api.put(`/api/folders/${folder._id}`, updated);
    fetchFolders();
  };

  const fetchNotesForFolder = async (folderId) => {
    setLoadingNotes(true);
    try {
      const res = await api.get(`/api/notes/${folderId}`);
      setNotesByFolder((prev) => ({
        ...prev,
        [folderId]: res.data,
      }));
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const toggleFolder = (folderId) => {
    if (expandedFolder === folderId) {
      setExpandedFolder(null);
    } else {
      setExpandedFolder(folderId);
      fetchNotesForFolder(folderId);
    }
  };

  const addNote = async (folderId) => {
    const title = prompt("Enter note title:");
    if (!title) return;
    try {
      await api.post(`/api/notes/${folderId}`, { title });
      fetchNotesForFolder(folderId);
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  };

  const filteredFolders = folders.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-page">
      <div className="notes-header">
        <input
          type="text"
          placeholder="Search folders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="add-folder">
          <input
            type="text"
            placeholder="New folder title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={addFolder}>➕ Add Folder</button>
        </div>
      </div>

      {folders.length === 0 ? (
        <p className="empty-message">Create a new folder to start working.</p>
      ) : (
        <div className="folder-grid">
          {filteredFolders.map((folder) => (
            <div key={folder._id} className="folder-block">
              <div
                className="folder-click-area"
                onClick={() => toggleFolder(folder._id)}
              >
                <FolderCard
                  folder={folder}
                  onEdit={editFolder}
                  onDelete={deleteFolder}
                  onFavorite={toggleFavorite}
                />
              </div>

              {expandedFolder === folder._id && (
                <div className="note-section">
                  {loadingNotes ? (
                    <p>Loading notes...</p>
                  ) : notesByFolder[folder._id]?.length > 0 ? (
                    <ul>
                      {notesByFolder[folder._id].map((note) => (
                        <li
                          key={note._id}
                          className="note-item"
                          onClick={() => navigate(`/notes/${note._id}`)}
                        >
                          📝 {note.title || "Untitled Note"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-notes">No notes yet.</p>
                  )}
                  <button
                    className="add-note-btn"
                    onClick={() => addNote(folder._id)}
                  >
                    ➕ Add Note
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
