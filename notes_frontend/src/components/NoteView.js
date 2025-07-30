import React from "react";

// PUBLIC_INTERFACE
/**
 * Read-only note viewer.
 * @param {object} props
 * @param {object} [props.note]
 */
export default function NoteView({ note }) {
  if (!note) {
    return <div className="note-view"><em>Select a note on the left or create a new one.</em></div>;
  }
  return (
    <div className="note-view">
      <h2>{note.title || <em>Untitled</em>}</h2>
      <div className="note-content">{note.content || <em>(No content)</em>}</div>
    </div>
  );
}
