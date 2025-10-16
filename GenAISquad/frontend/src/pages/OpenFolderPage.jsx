import React, { useState } from "react";
import "./OpenFolderPage.css";

export default function OpenFolderPage() {
  const [activeSection, setActiveSection] = useState("notes");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <div className="open-folder-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2 className="sidebar-title">MindMapAI</h2>
        <ul className="sidebar-menu">
          <li
            className={activeSection === "notes" ? "active" : ""}
            onClick={() => setActiveSection("notes")}
          >
            Notes
          </li>
          <li
            className={activeSection === "tasks" ? "active" : ""}
            onClick={() => setActiveSection("tasks")}
          >
            Tasks
          </li>
          <li
            className={activeSection === "maps" ? "active" : ""}
            onClick={() => setActiveSection("maps")}
          >
            Maps
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content-area">
        <div className="upload-section">
          <label className="upload-box">
            <input type="file" onChange={handleFileUpload} hidden />
            {uploadedFile ? (
              <span>{uploadedFile}</span>
            ) : (
              <span>Upload File or Drag & Drop Here</span>
            )}
          </label>
        </div>

        {/* Conditional Sections */}
        {activeSection === "notes" && (
          <section className="content-block">
            <h3>Summary Notes</h3>
            <textarea
              className="text-area"
              placeholder="AI generated notes will automatically update here..."
            ></textarea>
          </section>
        )}

        {activeSection === "tasks" && (
          <section className="content-block">
            <h3>Tasks</h3>
            <textarea
              className="text-area"
              placeholder="AI generated tasks will automatically update here..."
            ></textarea>
          </section>
        )}

        {activeSection === "maps" && (
          <section className="content-block">
            <h3>Mind Maps</h3>
            <div className="mindmap-placeholder">
              <p>AI-generated mind maps will appear here.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
