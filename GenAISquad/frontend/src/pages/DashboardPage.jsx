import React, { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import "./DashboardPage.css";

const DEFAULT_COLORS = ["#8BB2FF", "#FFB38B", "#9BE7C4", "#FFD28B", "#D3B9FF"];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export default function DashboardPage() {
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem("mm_folders_v4");
    return saved ? JSON.parse(saved) : []; // start with 0 folders
  });

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [sortMethod, setSortMethod] = useState("Newest");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [colorPickerTarget, setColorPickerTarget] = useState(null);

  const menuRef = useRef();

  // Persist folders in localStorage
  useEffect(() => {
    localStorage.setItem("mm_folders_v4", JSON.stringify(folders));
  }, [folders]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
        setColorPickerTarget(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Create folder
  const handleCreateFolder = () => {
    const newName = prompt("Enter folder name:");
    if (!newName) return;
    const newFolder = {
      id: uid(),
      name: newName.trim(),
      favorite: false,
      color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
      createdAt: Date.now(),
    };
    setFolders((prev) => [newFolder, ...prev]);
  };

  // Rename folder
  const handleRename = (id, newName) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName.trim() || f.name } : f))
    );
    setEditingId(null);
  };

  // Delete folder
  const handleDelete = (id) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  // Toggle favorite
  const handleFavorite = (id) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, favorite: !f.favorite } : f))
    );
  };

  // Change color
  const handleColorChange = (id, color) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, color } : f)));
    setColorPickerTarget(null);
  };

  // Sorting
  const applySort = (arr) => {
    switch (sortMethod) {
      case "A-Z":
        return [...arr].sort((a, b) => a.name.localeCompare(b.name));
      case "FavoritesFirst":
        return [...arr].sort((a, b) => (b.favorite ? 1 : -1));
      default:
        return [...arr].sort((a, b) => b.createdAt - a.createdAt);
    }
  };

  // Filter + Sort
  const filtered = folders.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );
  const displayed =
    activeTab === "Favorite" ? applySort(filtered.filter((f) => f.favorite)) : applySort(filtered);

  // Drag + drop reorder
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(displayed);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setFolders(reordered);
  };

  return (
    <div className="dashboard-root">
      {/* Top bar */}
      <header className="topbar">
        <div className="brand">MindMapAI Dashboard</div>
        <div className="top-actions">
          <input
            className="search-input"
            placeholder="Search folders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            className="sort-select"
          >
            <option value="Newest">Newest</option>
            <option value="A-Z">A - Z</option>
            <option value="FavoritesFirst">Favorites first</option>
          </select>
          <button className="new-folder-btn" onClick={handleCreateFolder}>
            + Create Folder
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        <button
          className={activeTab === "Home" ? "active" : ""}
          onClick={() => setActiveTab("Home")}
        >
          Home
        </button>
        <button
          className={activeTab === "Favorite" ? "active" : ""}
          onClick={() => setActiveTab("Favorite")}
        >
          Favorites
        </button>
      </nav>

      {/* Folder section */}
      <main className="folders-section">
        {folders.length === 0 ? (
          <div className="empty-state">
            <p>No folders yet.</p>
            <h3>Create a new folder to start work.</h3>
            <button onClick={handleCreateFolder}>+ Create Folder</button>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="folders-droppable" direction="horizontal">
              {(provided) => (
                <div
                  className="folders-grid"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {displayed.map((folder, idx) => (
                    <Draggable key={folder.id} draggableId={folder.id} index={idx}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className="folder-card"
                          style={{
                            backgroundColor: folder.color,
                            ...dragProvided.draggableProps.style,
                          }}
                        >
                          <div className="folder-header" ref={menuRef}>
                            <div
                              {...dragProvided.dragHandleProps}
                              className="drag-handle"
                              title="Drag to reorder"
                            >
                              ⇅
                            </div>

                            {editingId === folder.id ? (
                              <input
                                className="edit-input"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onBlur={() =>
                                  handleRename(folder.id, editingValue)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleRename(folder.id, editingValue);
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                autoFocus
                              />
                            ) : (
                              <h3
                                className="folder-title"
                                onClick={() => {
                                  setEditingId(folder.id);
                                  setEditingValue(folder.name);
                                }}
                              >
                                {folder.name}{" "}
                                {folder.favorite && <span className="star">★</span>}
                              </h3>
                            )}

                            <div
                              className="menu-icon"
                              onClick={() =>
                                setMenuOpen(menuOpen === folder.id ? null : folder.id)
                              }
                            >
                              ⋮
                            </div>

                            {/* Dropdown menu */}
                            {menuOpen === folder.id && (
                              <div className="folder-menu">
                                <button
                                  onClick={() => {
                                    setEditingId(folder.id);
                                    setEditingValue(folder.name);
                                    setMenuOpen(null);
                                  }}
                                >
                                  ✏️ Rename
                                </button>
                                <button
                                  onClick={() => {
                                    handleFavorite(folder.id);
                                    setMenuOpen(null);
                                  }}
                                >
                                  {folder.favorite ? "★ Unfavorite" : "☆ Favorite"}
                                </button>
                                <button
                                  onClick={() =>
                                    setColorPickerTarget(
                                      colorPickerTarget === folder.id ? null : folder.id
                                    )
                                  }
                                >
                                  🎨 Change Color
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(folder.id);
                                    setMenuOpen(null);
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            )}

                            {/* Color picker */}
                            {colorPickerTarget === folder.id && (
                              <div className="color-picker">
                                {DEFAULT_COLORS.map((color) => (
                                  <button
                                    key={color}
                                    className="color-swatch"
                                    style={{ backgroundColor: color }}
                                    onClick={() =>
                                      handleColorChange(folder.id, color)
                                    }
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </main>
    </div>
  );
}
