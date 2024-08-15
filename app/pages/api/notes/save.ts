import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/connect";
import Note from "../../../Models/NoteSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API route /api/notes/save called");
  if (req.method === "POST") {
    const {
      _id,
      title,
      tags,
      isFavorite,
      description,
      code,
      language,
      creationDate,
    } = req.body;

    try {
      await connect();
      console.log("Connected");
      const note = await Note.findByIdAndUpdate(
        _id,
        { title, tags, isFavorite, description, code, language, creationDate },
        { new: true, upsert: true }
      );
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: "Error saving note" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
