import React from "react";
import "./Sidebar.css";

export default function Sidebar({ activeTab, onTabChange, onLogout }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">MindMapAI</h2>
      <nav>
        <button
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => onTabChange("notes")}
        >
          🗂️ Notes
        </button>
        <button
          className={activeTab === "tasks" ? "active" : ""}
          onClick={() => onTabChange("tasks")}
        >
          ⏰ Tasks
        </button>
        <button onClick={onLogout}>🚪 Logout</button>
      </nav>
    </div>
  );
}
