import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/app/lib/connect";
import Note from "@/app/Models/NoteSchema";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();
  const { id } = req.query;
  const { userId } = getAuth(req);

  if (req.method === "PUT") {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Логирование для отладки
    console.log("Received PUT request:", req.body);
    console.log("Note creatorId:", note.creatorId);
    console.log("Current userId:", userId);

    // Проверяем, изменяется ли только поле isFavorite
    const isFavoriteOnlyUpdate = Object.keys(req.body).every(
      (key) => key === "isFavorite"
    );

    if (isFavoriteOnlyUpdate) {
      const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedNote);
    }

    // Проверка прав на редактирование
    if (note.creatorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedNote);
  }

  if (req.method === "DELETE") {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.creatorId !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Note.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
