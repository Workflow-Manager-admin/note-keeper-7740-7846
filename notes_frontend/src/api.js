//
// PUBLIC_INTERFACE
// Simple REST API wrapper for notes backend.
// Expects a backend at /api/notes or change BASE_URL as needed.
//

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/notes";

// PUBLIC_INTERFACE
export async function fetchNotes(query = "") {
  let url = BASE_URL;
  if (query) {
    url += `?search=${encodeURIComponent(query)}`;
  }
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch notes");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function fetchNote(id) {
  const resp = await fetch(`${BASE_URL}/${id}`);
  if (!resp.ok) throw new Error("Failed to fetch note");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function createNote(note) {
  const resp = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!resp.ok) throw new Error("Failed to create note");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id, note) {
  const resp = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!resp.ok) throw new Error("Failed to update note");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  const resp = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  if (!resp.ok) throw new Error("Failed to delete note");
  return true;
}
