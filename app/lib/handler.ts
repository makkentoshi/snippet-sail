import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Note from "../Models/NoteSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connection;

  if (req.method === "GET") {
    if (req.query.isFavorite) {
      try {
        const notes = await Note.find({ isFavorite: true });
        res.status(200).json(notes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch favorite notes" });
      }
    } else {
      try {
        const notes = await Note.find({});
        res.status(200).json(notes);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
      }
    }
  } else if (req.method === "POST") {
    try {
      const newNote = req.body;
      const note = new Note(newNote);
      await note.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: "Failed to create note" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const updatedNote = req.body;
      const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true });
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: "Failed to update note" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
