import mongoose, { Document, Schema } from "mongoose";

interface INote extends Document {
  _id: string;
  code: string;
  title: string;
  isFavorite?: boolean;
  tags?: string[];
  description?: string;
  language?: string;
  creatorId: string;
  creationDate: string;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  _id: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  description: { type: String, default: "" },
  code: { type: String, default: "Sorry, this snippet has no code" },
  language: { type: String, default: "" },
  creatorId: { type: String, required: true },
  creationDate: { type: String, default: new Date().toISOString() },
});

export default mongoose.models.Note ||
  mongoose.model<INote>("Note", NoteSchema);
