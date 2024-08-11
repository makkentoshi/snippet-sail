"use client";
import { SingleNoteType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { ThumbsUp } from "lucide-react";
import { LabelHTMLAttributes, useEffect, useState } from "react";

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    selectedNoteObject: { selectedNote, setSelectedNote },
  } = useGlobalContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(
    undefined
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (openContentNote) {
      if (selectedNote) {
        setSingleNote(selectedNote);
      }
    }
  }, [openContentNote, selectedNote]);

  return (
    <div
      className={`fixed top-0 ${
        isMobile
          ? "absolute left-1/2 top-1/2 w-4/5 h-4/5 transform -translate-x-1/2 -translate-y-1/2"
          : "right-0 w-[49%] h-full"
      } z-50 bg-white p-3 rounded-xl shadow-lg transition-transform duration-300 ${
        openContentNote
          ? "translate-x-0"
          : isMobile
          ? "-translate-x-full"
          : "translate-x-full"
      }`}
      style={{ display: openContentNote ? "block" : "none" }}
    >
      {singleNote && (
        <ContentNoteHeader
          singleNote={singleNote}
          setSingleNote={setSingleNote}
        ></ContentNoteHeader>
      )}
      <div
        onClick={() => setOpenContentNote(false)}
        className="mt-4 cursor-pointer text-blue-500"
      >
        Close
      </div>
    </div>
  );
};

export default ContentNote;

function ContentNoteHeader({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) {
  const {
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  function onUpdateTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      if (note._id === singleNote._id) {
        return newSingleNote;
      }
      return note;
    });
    setAllNotes(newAllNotes);
  }

  const { title } = singleNote;

  return (
    <input
      placeholder="New Title..."
      value={singleNote.title}
      onChange={onUpdateTitle}
    ></input>
  );
}
