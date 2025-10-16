import React, { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./MindMap.css";
import api from "../api/axios";

export default function MindMap({ noteId }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  // 🧠 Fetch summary for this note
  const loadSummary = async () => {
    try {
      const { data } = await api.get(`/notes/${noteId}`);
      if (data?.summary) setSummary(data.summary);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  // 🌿 Fetch nodes for this note
  const loadNodes = async () => {
    try {
      const { data } = await api.get(`/nodes/${noteId}`);
      if (!data?.length) {
        setNodes([]);
        setEdges([]);
        return;
      }

      const formattedNodes = data.map((node, i) => ({
        id: node._id,
        data: { label: node.title },
        position: {
          x: 200 + (i % 4) * 160,
          y: 100 + Math.floor(i / 4) * 120,
        },
      }));

      setNodes(formattedNodes);
      setEdges([]);
    } catch (err) {
      console.error("Error fetching nodes:", err);
    }
  };

  // ⏱️ Load data when noteId changes
  useEffect(() => {
    if (noteId) {
      loadSummary();
      loadNodes();
    }
  }, [noteId]);

  // ⚡ Generate AI summary + mindmap nodes
  const generateMindMap = async () => {
    try {
      setLoading(true);
      await api.post(`/ai/summary/${noteId}`);
      await api.post(`/nodes/${noteId}/generate`);
      await loadSummary();
      await loadNodes();
      alert("🧠 MindMap generated successfully!");
    } catch (err) {
      console.error("Error generating MindMap:", err);
      alert("Failed to generate MindMap. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit a node title
  const editNode = async (nodeId) => {
    const newTitle = prompt("Enter a new title for this node:");
    if (!newTitle) return;
    try {
      await api.put(`/nodes/${nodeId}`, { title: newTitle });
      loadNodes();
    } catch (err) {
      console.error("Error editing node:", err);
    }
  };

  // 🗑️ Delete a node
  const deleteNode = async (nodeId) => {
    if (!window.confirm("Are you sure you want to delete this node?")) return;
    try {
      await api.delete(`/nodes/${nodeId}`);
      loadNodes();
    } catch (err) {
      console.error("Error deleting node:", err);
    }
  };

  // 🕹️ ReactFlow event handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="mindmap-container">
      {/* Toolbar */}
      <div className="mindmap-toolbar">
        <button onClick={generateMindMap} disabled={loading}>
          {loading ? "Generating..." : "🧠 Generate MindMap"}
        </button>
        <button onClick={loadNodes}>🔄 Refresh</button>
      </div>

      {/* Summary Section */}
      <div className="summary-box">
        <h4>Summary</h4>
        <textarea
          readOnly
          value={summary || "No summary yet. Click Generate MindMap to create one."}
        />
      </div>

      {/* MindMap Visualization */}
      <div className="mindmap-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {/* Node Management Section */}
      {nodes.length > 0 && (
        <div className="mindmap-node-actions">
          <h4>Manage Nodes</h4>
          <div className="node-list">
            {nodes.map((node) => (
              <div key={node.id} className="node-control">
                <span>{node.data.label}</span>
                <div>
                  <button onClick={() => editNode(node.id)}>✏️</button>
                  <button onClick={() => deleteNode(node.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
