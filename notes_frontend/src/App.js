import React, { useEffect, useState } from 'react';
import './App.css';
import AppLayout from './components/AppLayout';
import NoteSidebar from './components/NoteSidebar';
import NoteTopbar from './components/NoteTopbar';
import NoteEditor from './components/NoteEditor';
import NoteView from './components/NoteView';
import {
  fetchNote,
  createNote,
  updateNote,
  deleteNote
} from './api';

// PUBLIC_INTERFACE
/**
 * Root of the Notes App. 
 */
function App() {
  // Persist selected noteId and edit/view mode in local state.
  const [selectedId, setSelectedId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editorValue, setEditorValue] = useState({ title: "", content: "" });
  const [status, setStatus] = useState("");
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);

  // PUBLIC_INTERFACE
  // Theme toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  // When a note is selected fetch details for it
  useEffect(() => {
    if (!selectedId) {
      setSelectedNote(null);
      setEditMode(false);
      setEditorValue({ title: "", content: "" });
      return;
    }
    fetchNote(selectedId)
      .then(note => {
        setSelectedNote(note);
        setEditorValue({ title: note.title, content: note.content });
        setEditMode(false);
      })
      .catch(() => {
        setSelectedNote(null);
        setStatus("Failed to load note");
      });
  }, [selectedId]);

  // PUBLIC_INTERFACE
  // Add new note
  function handleAddNote() {
    setSelectedId(null);
    setSelectedNote(null);
    setEditMode(true);
    setEditorValue({ title: "", content: "" });
  }

  // PUBLIC_INTERFACE
  // Select note to view/edit
  function handleSelectNote(id) {
    setSelectedId(id);
  }

  // PUBLIC_INTERFACE
  // Save note (create or update)
  async function handleSaveNote() {
    setSaving(true);
    setStatus("");
    try {
      if (!selectedNote || !selectedNote.id) {
        // New note
        const created = await createNote(editorValue);
        setSelectedId(created.id);
        setSelectedNote(created);
        setStatus("Note created");
      } else {
        // Edit
        const updated = await updateNote(selectedNote.id, editorValue);
        setSelectedNote(updated);
        setStatus("Note saved");
      }
      setEditMode(false);
    } catch (e) {
      setStatus("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  // PUBLIC_INTERFACE
  // Delete selected note
  async function handleDeleteNote() {
    if (!selectedNote) return;
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(selectedNote.id);
      setSelectedId(null);
      setSelectedNote(null);
      setEditMode(false);
      setEditorValue({ title: "", content: "" });
      setStatus("Note deleted");
    } catch (e) {
      setStatus("Delete failed: " + e.message);
    }
  }

  // PUBLIC_INTERFACE
  // Toggle dark/light theme
  function toggleTheme() {
    setTheme(t => t === "light" ? "dark" : "light");
  }

  function canSave() {
    return editorValue.title.trim() !== "" || editorValue.content.trim() !== "";
  }

  // Topbar actions
  const topbar = (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <NoteTopbar
        onDelete={selectedNote ? handleDeleteNote : undefined}
        onNew={handleAddNote}
        onSave={editMode ? handleSaveNote : undefined}
        saving={saving}
        canDelete={!!selectedNote}
        canSave={editMode && canSave()}
      />
      <button
        className="theme-toggle"
        style={{ marginLeft: 16 }}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );

  // Main display: edit, view, or empty state
  let main;
  if (editMode) {
    main = (
      <NoteEditor
        note={editorValue}
        onChange={setEditorValue}
      />
    );
  } else if (selectedNote) {
    main = (
      <div style={{ height: "100%" }}>
        <NoteView note={selectedNote} />
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      </div>
    );
  } else {
    main = (
      <div className="welcome-center">
        <h2>Welcome to NoteKeeper</h2>
        <p>Select a note from the sidebar or create a new note.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <AppLayout
        sidebar={
          <NoteSidebar
            selectedId={selectedId}
            onSelect={handleSelectNote}
            onAdd={handleAddNote}
          />
        }
        topbar={topbar}
        main={(
          <div>
            {status && <div className="statusbar">{status}</div>}
            {main}
          </div>
        )}
      />
    </div>
  );
}

export default App;
