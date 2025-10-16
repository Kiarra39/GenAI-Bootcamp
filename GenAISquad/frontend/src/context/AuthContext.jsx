import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔐 Register a new user
  const register = async (username, email, password) => {
    try {
      const res = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      const { token, ...userData } = res.data;
      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  // 🔑 Login existing user
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, ...userData } = res.data;

      localStorage.setItem("token", token);
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  // 🌐 Check if token exists on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Optionally, fetch user profile here if backend supports it:
      // api.get("/api/auth/me").then(res => setUser(res.data));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
          color: "#3d4fe0",
        }}
      >
        <h2>Loading MindMapAI...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
