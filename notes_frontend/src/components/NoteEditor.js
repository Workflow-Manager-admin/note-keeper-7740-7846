import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * Note editing form.
 * @param {object} props
 * @param {object} [props.note]
 * @param {(note:object) => void} props.onChange
 */
export default function NoteEditor({ note, onChange }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
  }, [note]);

  useEffect(() => {
    onChange({ title, content });
    // eslint-disable-next-line
  }, [title, content]);

  return (
    <form
      className="editor"
      onSubmit={e => e.preventDefault()}
      aria-label="Edit Note"
      onKeyDown={e => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
        }
      }}
    >
      <input
        className="editor-title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={128}
        autoFocus
      />
      <textarea
        className="editor-content"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={18}
      />
    </form>
  );
}
