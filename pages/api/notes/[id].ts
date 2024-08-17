import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/app/lib/connect";
import NoteModel from "@/app/Models/NoteSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      await connect();
      const result = await NoteModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update note" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
