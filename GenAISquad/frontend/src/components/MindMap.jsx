import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./MindMap.css";

export default function MindMap({ noteId }) {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    if (noteId) {
      api.get(`/api/nodes/${noteId}`).then((res) => setNodes(res.data));
    }
  }, [noteId]);

  return (
    <div className="mindmap-container">
      <h3>Mind Map</h3>
      <div className="mindmap-grid">
        {nodes.length === 0 ? (
          <p>No nodes generated yet.</p>
        ) : (
          nodes.map((node) => (
            <div key={node._id} className="mindmap-node">
              {node.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
