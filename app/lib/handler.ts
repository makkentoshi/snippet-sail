import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'; // Import the mongoose instance
import Note from '../Models/NoteSchema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connection; 

  if (req.method === 'GET') {
    try {
      const notes = await Note.find({}); 
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  } else if (req.method === 'POST') {
    try {

      const newNote = req.body;
      const note = new Note(newNote);
      await note.save(); 
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create note' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}