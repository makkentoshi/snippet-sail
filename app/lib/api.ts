import { SingleNoteType } from "../Types";

export async function fetchNotes() {
  const response = await fetch("/api/notes");  
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
}

export async function postNote(note: SingleNoteType) {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
}

export async function updateNote(
  id: string,
  updatedNote: Partial<SingleNoteType>
) {
  const response = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
}
