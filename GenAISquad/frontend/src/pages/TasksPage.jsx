import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./TasksPage.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!form.title) return;
    await api.post("/tasks", form);
    setForm({ title: "", description: "", startTime: "", endTime: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const markDone = async (id) => {
    await api.put(`/tasks/${id}`, { status: "completed" });
    fetchTasks();
  };

  return (
    <div className="tasks-page">
      <h2>Tasks</h2>
      <div className="task-inputs">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
        />
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <small>
              {new Date(task.startTime).toLocaleString()} →{" "}
              {new Date(task.endTime).toLocaleString()}
            </small>
            <div>
              <button onClick={() => markDone(task._id)}>✅ Done</button>
              <button onClick={() => deleteTask(task._id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
