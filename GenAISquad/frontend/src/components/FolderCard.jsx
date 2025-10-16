import React, { useState } from "react";
import "./FolderCard.css";

export default function FolderCard({ folder, onEdit, onDelete, onFavorite }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="folder-card">
      <div className="folder-header">
        <h3 className="folder-title">{folder.title}</h3>

        <div className="folder-menu">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <button onClick={() => onEdit(folder)}>✏️ Edit</button>
              <button onClick={() => onFavorite(folder)}>
                {folder.isFavorite ? "⭐ Unfavorite" : "☆ Favorite"}
              </button>
              <button onClick={() => onDelete(folder)}>🗑️ Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
