import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import NotesPage from "./NotesPage";
import TasksPage from "./TasksPage";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <div className="profile-layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout} />

      <main className="profile-main">
        <header className="profile-header">
          <h1>Welcome, {user?.name || "Student"} 👋</h1>
          <p>Let’s organize your study materials effectively.</p>
        </header>

        <section className="profile-content">
          {activeTab === "notes" && <NotesPage />}
          {activeTab === "tasks" && <TasksPage />}
        </section>
      </main>
    </div>
  );
}
