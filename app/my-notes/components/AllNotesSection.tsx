"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import DeleteIcon from "@mui/icons-material/Delete";
import JavascriptIcon from "@mui/icons-material/Javascript";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useGlobalContext } from "@/ContextApi";
import { SingleNoteType } from "@/app/Types";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/app/lib/hooks/useNotes";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CodeBlockProps {
  language: string;
  code: string;
}

function AllNotesSection() {
  const { notes, loading, error } = useNotes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-5 flex flex-wrap gap-4">
      {notes.map((note) => (
        <SingleNote key={note._id} note={note} />
      ))}
    </div>
  );
}

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNoteType }) {
  const {
    title,
    creationDate,
    tags = [],
    description,
    code,
    isFavorite = false,
    language,
    _id,
    creatorId,
  } = note;

  return (
    <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[625px] py-4 bg-white shadow-md">
      <NoteHeader
        title={title ?? "Untitled"}
        isFavorite={isFavorite ?? false}
        note={note}
        _id={_id}
      />
      <NoteDate creationDate={creationDate ?? "Unknown date"} />
      <NoteTags tags={tags ?? []} />
      <NoteDescription description={description ?? "No description"} />
      <Code language={language ?? "Not Selected"} code={code ?? ""} />
      <NoteFooter
        language={language ?? "Not Selected"}
        creatorId={creatorId}
        _id={_id}
      />
    </div>
  );
}

function NoteHeader({
  title,
  isFavorite,
  note,
  _id,
}: {
  title: string;
  isFavorite: boolean;
  note: SingleNoteType;
  _id: string;
}) {
  const {
    openContentNoteObject: { setOpenContentNote },
    selectedNoteObject: { setSelectedNote },
    toggleFavorite,
  } = useGlobalContext();

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const updatedNote = { ...note, isFavorite: !isFavorite };

      await fetch(`/api/notes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      toggleFavorite(_id);
    } catch (error) {
      console.error("Failed to update favorite status", error);
    }
  };

  const handleClick = () => {
    setSelectedNote(note);
    setOpenContentNote(true);
  };

  return (
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%] cursor-pointer hover:text-blue-900"
        onClick={handleClick}
      >
        {title}
      </span>
      <Button
        className="z-50 cursor-pointer hover:bg-gray-100 p-2 border rounded-full transition-all"
        onClick={handleFavoriteToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer text-red-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </Button>
    </div>
  );
}

function NoteDate({ creationDate }: { creationDate: string }) {
  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span>{creationDate}</span>
    </div>
  );
}

function NoteTags({ tags }: { tags: string[] }) {
  return (
    <div className="text-white text-[11px] mx-4 flex-wrap flex gap-1 mt-4">
      {tags.map((tag, index) => (
        <span key={index} className="bg-[#31267a] p-1 rounded-[7px] px-2">
          {tag}
        </span>
      ))}
    </div>
  );
}

function NoteDescription({ description }: { description: string }) {
  return (
    <div className="text-slate-600 text-[13px] mt-4 mx-4">{description}</div>
  );
}

const Code: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <div className="rounded-[15px] overflow-hidden text-sm mx-4 mt-4 overflow-y-auto max-h-[500px]">
      <SyntaxHighlighter language={language} style={vs}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

function NoteFooter({
  language,
  creatorId,
  _id,
}: {
  language: string;
  creatorId: string;
  _id: string;
}) {
  const { user } = useUser();
  const userId = user?.id;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await fetch(`/api/notes/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsOpen(false);
      router.refresh();
      router.push("/my-notes");
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  return (
    <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3">
      <div className="flex gap-1 items-center">
        <JavascriptIcon fontSize={"large"} />
        <span>{language}</span>
      </div>
      {userId === creatorId && (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button className="z-50 cursor-pointer hover:bg-gray-100 p-2 border rounded-full transition-all">
              <DeleteIcon fontSize={"medium"} />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
