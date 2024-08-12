"use client";
import { SingleNoteType } from "@/app/Types";
import { useGlobalContext } from "@/ContextApi";
import { ThumbsUp } from "lucide-react";
import React, { LabelHTMLAttributes, useEffect, useRef, useState } from "react";
import { CheckOutlined, TagsOutlined } from "@ant-design/icons";

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
    if (openContentNote) {
      if (isNewNote) {
        setSingleNote({
          _id: "",
          title: "",
          tags: [],
          isFavorite: false,
          description: "",
          code: "",
          language: "",
          creationDate: "",
        });
        setSelectedTags([]);
      } else if (selectedNote) {
        setSingleNote({ ...selectedNote });
        setSelectedTags(
          selectedNote.tags.map((tag) => ({ name: tag, _id: "" }))
        );
      }
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
        <>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
        </>
      )}
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
    openContentNoteObject: { setOpenContentNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
  } = useGlobalContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [onFocus, setOnFocus] = useState(false);

  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <div className="flex jusitfy-between gap-8 mt-3 transition-all">
      <div className="flex gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            onFocus ? "text-blue-800" : "text-slate-400"
          } size-6 mt-[1.3px] transition-all`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
          />
        </svg>

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
      <div className="ml-5">
        <CheckOutlined  className="text-slate-400 mt-[px] cursor-pointer"/>
      </div>
      <div
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
        }}
        className="text-slate-400 mt-[px] cursor-pointer"
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
      </div>
    </div>
  );
}

function NoteTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
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
    const newSingleNote = {
      ...singleNote,
      tags: selectedTags.map((tag) => tag.name),
    };

    const newAllNotes = allNotes.map((note) =>
      note._id === singleNote._id ? newSingleNote : note
    );

    setAllNotes(newAllNotes);
    setSingleNote(newSingleNote);
  }, [selectedTags]);

  return (
    <div className="flex text-[13px] items-center gap-2">
    <TagsOutlined style={{ fontSize: '22px', color: '#08c' }} />

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex justify-between w-full relative"
      >
        <div className="flex gap-2 items-center flex-wrap select-none ">
          {singleNote.tags.length === 0 && (
            <div className="">
              <span className="bg-slate-100 text-slate-400 p-1 px-2 rounded-[15px]">
                No Tags
              </span>
            </div>
          )}

          {singleNote.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-slate-100 text-slate-400 px-2 py-1 rounded-xl"
            >
              {tag}
            </div>
          ))}
          {hovered && singleNote.tags.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-slate-400 cursor-pointer"
              onClick={() => {
                setIsOpened(!isOpened);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          )}
        </div>
        {isOpened && <TagsMenu onClickedTag={onClickedTag}></TagsMenu>}
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
    <ul className="absolute top-[40px] bg-slate-100 w-[60%] p-3 rounded-xl flex flex-col gap-2">
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
