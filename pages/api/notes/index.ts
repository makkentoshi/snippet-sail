import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/app/lib/connect";
import Note from "@/app/Models/NoteSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  if (req.method === "GET") {
    try {
      const notes = await Note.find({});
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving notes" });
    }
  } else if (req.method === "POST") {
    const {
      _id,
      title,
      tags,
      isFavorite,
      description,
      code,
      language,
      creationDate,
      creatorId,
    } = req.body;

    try {
      const note = await Note.findByIdAndUpdate(
        _id,
        {
          title,
          tags,
          isFavorite,
          description,
          code,
          language,
          creationDate,
          creatorId,
        },
        { new: true, upsert: true }
      );
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: "Error saving note" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
