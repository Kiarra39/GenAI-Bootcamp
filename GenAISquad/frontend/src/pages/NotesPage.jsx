import React, { useEffect, useState } from "react";
import api from "../api/axios";
import FolderCard from "../components/FolderCard";
import "./NotesPage.css";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [folders, setFolders] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [search, setSearch] = useState("");
  const [expandedFolder, setExpandedFolder] = useState(null);
  const [notesByFolder, setNotesByFolder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await api.get("/folders");
    setFolders(res.data);
  };

  const addFolder = async () => {
    if (!newTitle.trim()) return;
    await api.post("/folders", { title: newTitle });
    setNewTitle("");
    fetchFolders();
  };

  const editFolder = async (folder) => {
    const name = prompt("Rename folder:", folder.title);
    if (!name) return;
    await api.put(`/folders/${folder._id}`, { name });
    fetchFolders();
  };

  const deleteFolder = async (folder) => {
    if (!window.confirm("Delete this folder?")) return;
    await api.delete(`/folders/${folder._id}`);
    fetchFolders();
  };

  const fetchNotesForFolder = async (folderId) => {
    const res = await api.get(`/notes/${folderId}`);
    setNotesByFolder((prev) => ({ ...prev, [folderId]: res.data }));
  };

  const toggleFolder = (id) => {
    if (expandedFolder === id) setExpandedFolder(null);
    else {
      setExpandedFolder(id);
      fetchNotesForFolder(id);
    }
  };

  const addNote = async (folderId) => {
    const title = prompt("Note title:");
    if (!title) return;
    await api.post("/notes", { folderId, title, content: "" });
    fetchNotesForFolder(folderId);
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
        <p className="empty-message">Create a new folder to start.</p>
      ) : (
        <div className="folder-grid">
          {filteredFolders.map((folder) => (
            <div key={folder._id} className="folder-block">
              <div onClick={() => toggleFolder(folder._id)}>
                <FolderCard
                  folder={folder}
                  onEdit={editFolder}
                  onDelete={deleteFolder}
                />
              </div>

              {expandedFolder === folder._id && (
                <div className="note-section">
                  {notesByFolder[folder._id]?.length ? (
                    notesByFolder[folder._id].map((note) => (
                      <p
                        key={note._id}
                        className="note-item"
                        onClick={() => navigate(`/notes/${note._id}`)}
                      >
                        📝 {note.title}
                      </p>
                    ))
                  ) : (
                    <p className="no-notes">No notes in this folder.</p>
                  )}
                  <button className="add-note-btn" onClick={() => addNote(folder._id)}>
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
