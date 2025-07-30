import React from "react";

// PUBLIC_INTERFACE
/**
 * Top bar for actions (Delete, Save...).
 * @param {object} props
 * @param {() => void} [props.onDelete]
 * @param {() => void} [props.onNew]
 * @param {() => void} [props.onSave]
 * @param {boolean} [props.saving]
 * @param {boolean} [props.canDelete]
 * @param {boolean} [props.canSave]
 */
export default function NoteTopbar({ onDelete, onNew, onSave, saving, canDelete, canSave }) {
  return (
    <div className="topbar">
      <div>
        <button className="btn" onClick={onNew}>New</button>
      </div>
      <div style={{ flex: 1 }} />
      <div>
        <button className="btn" onClick={onSave} disabled={!canSave || saving}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button className="btn btn-danger" onClick={onDelete} disabled={!canDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
