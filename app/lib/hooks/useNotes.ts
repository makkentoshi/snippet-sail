import { useState, useEffect } from 'react';
import { fetchNotes, postNote, updateNote } from '../api';
import { SingleNoteType } from '@/app/Types';

export function useNotes() {
  const [notes, setNotes] = useState<SingleNoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesData = await fetchNotes();
        setNotes(notesData);
      } catch (error) {
        setError('Failed to fetch notes');
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  const addNote = async (note: SingleNoteType) => {
    try {
      const newNote = await postNote(note);
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      setError('Failed to create note');
    }
  };

  const editNote = async (id: string, updatedNote: Partial<SingleNoteType>) => {
    try {
      const updated = await updateNote(id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updated } : note
        )
      );
    } catch (error) {
      setError('Failed to update note');
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    editNote,
  };
}