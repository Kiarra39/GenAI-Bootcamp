import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./TasksPage.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.title) return;
    await api.post("/api/tasks", newTask);
    setNewTask({ title: "", description: "", deadline: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleDone = async (task) => {
    await api.put(`/api/tasks/${task._id}`, { done: !task.done });
    fetchTasks();
  };

  return (
    <div className="tasks-page">
      <div className="task-inputs">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />
        <button onClick={addTask}>Add Task ➕</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add your first one!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className={`task-card ${task.done ? "done" : ""}`}>
              <div className="task-info">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span>📅 {task.deadline?.slice(0, 10)}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleDone(task)}>
                  {task.done ? "✅ Undo" : "✔️ Done"}
                </button>
                <button onClick={() => deleteTask(task._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
