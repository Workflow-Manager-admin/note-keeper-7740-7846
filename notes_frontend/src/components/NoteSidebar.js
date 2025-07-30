import React, { useEffect, useState } from "react";
import { fetchNotes } from "../api";

// PUBLIC_INTERFACE
/**
 * Sidebar for notes list and quick search.
 * @param {{selectedId: string, onSelect: (id) => void, onAdd: () => void}} props
 */
export default function NoteSidebar({ selectedId, onSelect, onAdd }) {
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchNotes(q)
      .then(setNotes)
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [q]);

  // PUBLIC_INTERFACE
  function search(e) {
    setQ(e.target.value);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="title">Notes</span>
        <button title="Add note" className="btn-add" onClick={onAdd}>＋</button>
      </div>
      <input
        className="sidebar-search"
        placeholder="Search…"
        value={q}
        onChange={search}
      />
      <div className="sidebar-list" role="list">
        {loading && <div className="sidebar-item disabled">Loading…</div>}
        {!loading && notes.length === 0 && (
          <div className="sidebar-item disabled">No notes found</div>
        )}
        {notes.map((n) => (
          <div
            key={n.id}
            className={"sidebar-item" + (n.id === selectedId ? " selected" : "")}
            onClick={() => onSelect(n.id)}
            tabIndex={0}
          >
            {n.title || <em>Untitled</em>}
          </div>
        ))}
      </div>
    </aside>
  );
}
