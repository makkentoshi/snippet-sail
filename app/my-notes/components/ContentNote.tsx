"use client";
import { useCallback } from "react";
import { SingleNoteType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { ThumbsUp } from "lucide-react";
import React, { LabelHTMLAttributes, useEffect, useRef, useState } from "react";
import { CheckOutlined, TagsOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { Select } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Toaster } from "@/components/ui/toaster";
import MonacoEditor from "@monaco-editor/react";

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    selectedNoteObject: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [singleNote, setSingleNote] = useState<SingleNoteType | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!openContentNote) return;

    if (isNewNote) {
      const newNote = {
        _id: uuidv4(),
        title: "",
        tags: [],
        isFavorite: false,
        description: "",
        code: "",
        language: "",
        creationDate: new Date().toISOString(),
      };

      setSingleNote(newNote);

      setSelectedTags([]);
    } else if (selectedNote) {
      const noteToEdit = { ...selectedNote };
      setSingleNote(noteToEdit);

      setSelectedTags(
        selectedNote.tags?.map((tag) => ({ name: tag, _id: uuidv4() })) || []
      );
    }
  }, [openContentNote, isNewNote, selectedNote, setSelectedTags]);

  useEffect(() => {
    if (singleNote && !isNewNote) {
      const updatedNotes = allNotes.map((note) =>
        note._id === singleNote._id ? singleNote : note
      );
      setAllNotes(updatedNotes);
    }
  }, [singleNote, allNotes, setAllNotes, isNewNote]);

  const handleSaveNewNote = () => {
    if (isNewNote && singleNote?.title) {
      setAllNotes((prevNotes) => [...prevNotes, singleNote]);
      setIsNewNote(false);
      setOpenContentNote(false);
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSingleNote((prevNote) =>
      prevNote ? { ...prevNote, title: e.target.value } : null
    );
  };

  const handleTagToggle = (tag: SingleTagType) => {
    const newTags = selectedTags.some((t) => t.name === tag.name)
      ? selectedTags.filter((t) => t.name !== tag.name)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    setSingleNote((prevNote) =>
      prevNote ? { ...prevNote, tags: newTags.map((t) => t.name) } : null
    );
  };

  const handleClose = () => {
    handleSaveNewNote();
    setOpenContentNote(false);
  };

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
        <div className="px-[10%] py-[4%]">
          <div className="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="transition-all size-6 mt-3  text-[#31267a]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
            <div className="w-full">
              <ContentNoteHeader
                singleNote={singleNote}
                setSingleNote={setSingleNote}
              />
            </div>
          </div>

          <div className="flex items-start gap-4 mt-6">
            <TagsOutlined style={{ fontSize: "22px", color: "#31267a" }} />
            <div className="w-full">
              <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
            </div>
          </div>

          <div className="flex items-start gap-4 mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#31267a]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>

            <div className="w-full">
              <NoteDescription
                singleNote={singleNote}
                setSingleNote={setSingleNote}
              />
            </div>
          </div>

          <div className="flex items-start gap-4 mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#31267a] flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
              />
            </svg>

            <div className="w-full">
              <NoteCode singleNote={singleNote} setSingleNote={setSingleNote} />
            </div>
          </div>
          <div className="mt-6">
            <ConfirmNote
              singleNote={singleNote}
              setAllNotes={setAllNotes}
              setSingleNote={setSingleNote}
              setIsNewNote={setIsNewNote}
              setOpenContentNote={setOpenContentNote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentNote;

function ContentNoteHeader({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType | null;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}) {
  const {
    allNotesObject: { allNotes, setAllNotes },
    openContentNoteObject: { setOpenContentNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
  } = useGlobalContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!singleNote) return;

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
  const { toast } = useToast();
  const handlePostNote = useCallback(() => {
    if (singleNote && singleNote.title.trim() !== "") {
      const newNote = { ...singleNote };

      setAllNotes((prevNotes) => [...prevNotes, newNote]);
      setSingleNote(null);
      setIsNewNote(false);
      setOpenContentNote(false);
    } else {
      alert("You can't create a snippet without a title");
    }
  }, [
    singleNote,
    setAllNotes,
    setSingleNote,
    setIsNewNote,
    setOpenContentNote,
  ]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  const [onFocus, setOnFocus] = useState(false);

  return (
    <div className="flex jusitfy-between gap-8 mt-3 transition-all">
      <div className="flex gap-2 w-full">
        <textarea
          ref={textareaRef}
          placeholder="New Title..."
          value={singleNote?.title}
          onChange={onUpdateTitle}
          onKeyDown={handleKeyDown}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          className="font-bold text-xl outline-none resize-none h-auto overflow-hidden w-full"
        ></textarea>
      </div>

      <Button
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
        }}
        className="text-slate-500 mt-1 cursor-pointer  rounded-full px-2   "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}

function NoteTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType | null;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}) {
  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const {
    allNotesObject: { allNotes, setAllNotes },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  function onClickedTag(tag: SingleTagType) {
    if (selectedTags.some((t) => t.name === tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  useEffect(() => {
    if (singleNote) {
      const newSingleNote = {
        ...singleNote,
        tags: selectedTags.map((tag) => tag.name),
      };
      const newAllNotes = allNotes.map((note) =>
        note._id === singleNote._id ? newSingleNote : note
      );

      setAllNotes(newAllNotes);
      setSingleNote(newSingleNote);
    }
  }, [selectedTags]);

  return (
    <div className="flex text-[13px] items-center gap-2">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex justify-between w-full relative"
      >
        <div
          className="flex gap-2 items-center flex-wrap select-none pb-4"
          style={{ minHeight: "40px" }}
        >
          {!singleNote || !singleNote.tags || singleNote.tags.length === 0 ? (
            <div>
              <span className="bg-slate-100 text-slate-500 p-1 px-2  rounded-[12px]">
                No Tags
              </span>
            </div>
          ) : (
            singleNote.tags.map((tag, index) => (
              <div
                key={index}
                className="bg-slate-100 text-slate-400 px-2 py-1 rounded-xl"
              >
                {tag}
              </div>
            ))
          )}

          {hovered && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-slate-400 cursor-pointer"
              onClick={() => setIsOpened(!isOpened)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isOpened
                    ? "m19.5 8.25-7.5 7.5-7.5-7.5"
                    : "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                }
              />
            </svg>
          )}
        </div>
        {isOpened && <TagsMenu onClickedTag={onClickedTag} />}
      </div>
    </div>
  );
}

interface SingleTagType {
  _id: string;
  name: string;
}

function TagsMenu({
  onClickedTag,
}: {
  onClickedTag: (tag: SingleTagType) => void;
}) {
  const {
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  return (
    <ul className="absolute top-[30px] bg-slate-100 w-[40%] p-4 rounded-[8px] flex flex-col gap-2">
      {allTags.map((tag) => (
        <li
          key={tag._id}
          onClick={() => {
            onClickedTag(tag);
          }}
          className={`${
            selectedTags.some(
              (t) => t.name.toLowerCase() === tag.name.toLocaleLowerCase()
            )
              ? "bg-slate-300"
              : ""
          } p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-[13px] transition-all`}
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
}

function NoteDescription({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType | null;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}) {
  const [description, setDescription] = useState(singleNote?.description || "");

  useEffect(() => {
    if (singleNote) {
      setDescription(singleNote.description || "");
    }
  }, [singleNote]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    if (singleNote) {
      const updatedNote = { ...singleNote, description: newDescription };
      setSingleNote(updatedNote);
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        id="note-description"
        value={singleNote?.description}
        onChange={handleDescriptionChange}
        className="mt-1 p-2 rounded-[6px] focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm outline-none  border  "
        rows={4}
      />
    </div>
  );
}

interface NoteCodeProps {
  singleNote: SingleNoteType | null;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
}
interface LanguageOption {
  value: string;
  label: string;
}

const NoteCode: React.FC<NoteCodeProps> = ({ singleNote, setSingleNote }) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption | null>(null);

  const handleLanguageChange = (option: LanguageOption | null) => {
    setSelectedLanguage(option);
    if (singleNote) {
      setSingleNote({
        ...singleNote,
        language: option ? option.value : "",
      });
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    setSingleNote((prev) => {
      if (prev) {
        return {
          ...prev,
          code: value || "",
        };
      } else {
        return {
          _id: uuidv4(),
          code: value || "",
          title: "Unknown Title",
        };
      }
    });
  };

  return (
    <div className="note-code-container py-5 border rounded-[6px]">
      <MonacoEditor
        height="400px"
        onChange={handleCodeChange}
        defaultLanguage="javascript"
        value={singleNote?.code || ""}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

interface ConfirmNoteProps {
  singleNote: SingleNoteType | null;
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>;
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmNote: React.FC<ConfirmNoteProps> = ({
  singleNote,
  setAllNotes,
  setSingleNote,
  setIsNewNote,
  setOpenContentNote,
}) => {
  const { toast } = useToast();

  const handleConfirm = useCallback(async () => {
    if (singleNote && singleNote.title.trim() !== "") {
      console.log(singleNote);
      try {
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(singleNote),
        });

        if (!response.ok) {
          throw new Error("Failed to save note");
        }

        const updatedNote = await response.json();

        setAllNotes((prevNotes) =>
          prevNotes.some((note) => note._id === updatedNote._id)
            ? prevNotes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            : [...prevNotes, updatedNote]
        );
        setSingleNote(null);
        setIsNewNote(false);
        setOpenContentNote(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Warning",
        description: "Note must have a title",
        variant: "destructive",
      });
    }
  }, [
    singleNote,
    setAllNotes,
    setSingleNote,
    setIsNewNote,
    setOpenContentNote,
    toast,
  ]);

  return (
    <div className="flex flex-col transition-all">
      <Button
        onClick={handleConfirm}
        className="mt-6 bg-blue-900 text-white rounded-[8px] hover:bg-blue-800 "
      >
        Confirm
      </Button>
      <Button
        onClick={() => {}}
        className="mt-3 border rounded-[8px] hover:bg-gray-100 hover:text-slate-500"
      >
        Cancel
      </Button>
    </div>
  );
};
