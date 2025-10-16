import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import OpenFolderPage from './pages/OpenFolderPage';
//import MindMapPage from "./pages/MindMapPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<WelcomePage />} />

        {/* Upload page */}
        <Route path="/upload" element={<UploadPage />} />

        {/* Login page */} 
        <Route path="/Login" element={<LoginPage />} />

        {/* Signup page */}
        <Route path="/Signup" element={<SignupPage />} />
        
        {/* Dashboard page */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Open folder page */}
        <Route path="/open-folder" element={<OpenFolderPage />} />


        {/* Mind map display page */}
        {/*<Route path="/mindmap" element={<MindMapPage />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
