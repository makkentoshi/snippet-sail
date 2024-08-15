"use client";
import React, { useEffect, useState } from "react";
import { SingleNoteType } from "@/app/Types";
import SingleNote from "./components/SingleNote";

function FavoriteNotesPage() {
  const [notes, setNotes] = useState<SingleNoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFavoriteNotes() {
      try {
        const response = await fetch("/api/notes?isFavorite=true");
        if (!response.ok) {
          throw new Error("Failed to fetch favorite notes");
        }
        const notesData = await response.json();
        setNotes(notesData);
      } catch (error) {
        setError("Failed to fetch favorite notes");
      } finally {
        setLoading(false);
      }
    }

    loadFavoriteNotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-5 flex flex-wrap gap-4 ">
      {notes.length === 0 ? (
        <p>No favorite notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id}>
            <SingleNote note={note} />
          </div>
        ))
      )}
    </div>
  );
}

export default FavoriteNotesPage;
