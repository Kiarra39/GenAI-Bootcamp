import React, { useState } from "react";
import NoteEditor from "../components/NoteEditor";
import MindMap from "../components/MindMap";
import "./MindMapPage.css";

export default function MindMapPage() {
  const [noteId, setNoteId] = useState("");

  return (
    <div className="mindmap-page">
      <h2>Mind Map Visualization</h2>
      <input
        type="text"
        placeholder="Enter Note ID to load"
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
      />

      {noteId && (
        <>
          <NoteEditor noteId={noteId} />
          <MindMap noteId={noteId} />
        </>
      )}
    </div>
  );
}
