// src/components/MindMap.jsx
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./MindMap.css";

/**
 * MindMap Component
 * ------------------
 * Renders an interactive graph visualization of AI-generated nodes.
 * Expects `nodes` prop in the format:
 * [
 *   { id: '1', label: 'Main Topic' },
 *   { id: '2', label: 'Subtopic', parent: '1' },
 *   ...
 * ]
 */
export default function MindMap({ nodes = [] }) {
  // Convert backend nodes → ReactFlow format
  const formattedNodes = nodes.map((node, index) => ({
    id: node.id?.toString() || `${index + 1}`,
    position: {
      x: node.x || Math.random() * 400,
      y: node.y || Math.random() * 300,
    },
    data: { label: node.label || "Untitled Node" },
    style: {
      borderRadius: "10px",
      padding: "10px 15px",
      backgroundColor: "#ede9fe",
      border: "1.5px solid #5b21b6",
      color: "#3b1b8c",
      fontWeight: 500,
      fontSize: "0.95rem",
    },
  }));

  const formattedEdges = nodes
    .filter((n) => n.parent)
    .map((n) => ({
      id: `e${n.parent}-${n.id}`,
      source: n.parent.toString(),
      target: n.id.toString(),
      type: "smoothstep",
      animated: true,
      style: { stroke: "#5b21b6", strokeWidth: 2 },
    }));

  const [mapNodes, setNodes, onNodesChange] = useNodesState(formattedNodes);
  const [mapEdges, setEdges, onEdgesChange] = useEdgesState(formattedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#5b21b6", strokeWidth: 2 },
          },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="mindmap-container">
      <ReactFlow
        nodes={mapNodes}
        edges={mapEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap
          nodeColor={() => "#5b21b6"}
          maskColor="#ede9fe"
          nodeStrokeWidth={1}
        />
        <Controls />
        <Background color="#dcd1f5" gap={18} />
      </ReactFlow>
    </div>
  );
}
