import React from "react";
import { ThumbsUp } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import JavascriptIcon from "@mui/icons-material/Javascript";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useGlobalContext } from "@/ContextApi";
import { SingleNoteType } from "@/app/Types";

interface CodeBlockProps {
  language: string;
  code: string;
}

function AllNotesSection() {
  const {
    allNotesObject: { allNotes },
  } = useGlobalContext();
  return (
    <div className="mt-5 flex flex-wrap gap-4 ">
      {allNotes.map((note, index) => (
        <div key={index}>
          <SingleNote note={note}></SingleNote>
        </div>
      ))}
    </div>
  );
}

export default AllNotesSection;

function SingleNote({ note }: { note: SingleNoteType }) {
  const {
    openContentNoteObject: { setOpenContentNote },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();

  const handleClick = () => {
    setSelectedNote(note); 
    setOpenContentNote(true); 
  };

  const { title, creationDate, tags, description, code, isFavorite, language } =
    note;

  return (
    <div onClick={handleClick} className="max-sm:w-full rounded-xl flex flex-col justify-between w-[625px] py-4 bg-white shadow-md cursor-pointer">
      <NoteHeader title={title} isFavorite={isFavorite}></NoteHeader>
      <NoteDate creationDate={creationDate}></NoteDate>
      <NoteTags tags={tags}></NoteTags>
      <NoteDescription description={description}></NoteDescription>
      <Code language={language} code={code}></Code>
      <NoteFooter language={language}></NoteFooter>
    </div>
  );
}

function NoteHeader({
  title,
  isFavorite,
}: {
  title: string;
  isFavorite: boolean;
}) {
  const {
    openContentNoteObject: { setOpenContentNote },
  } = useGlobalContext();

  return (
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%] cursor-pointer hover:text-blue-900"
        onClick={() => setOpenContentNote(true)}
      >
        {title}
      </span>
      <ThumbsUp className="text-slate-400 cursor-pointer"></ThumbsUp>
    </div>
  );
}

function NoteDate({ creationDate }: { creationDate: string }) {
  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span className="">{creationDate}</span>
    </div>
  );
}

function NoteTags({ tags }: { tags: string[] }) {
  return (
    <div className=" text-white text-[11px] mx-4 flex-wrap flex gap-1 mt-4  ">
      {tags.map((tag, index) => (
        <span key={index} className="bg-[#31267a]  p-1 rounded-[7px] px-2">
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
    <div className="rounded-[15px] overflow-hidden text-sm mx-4 mt-4">
      <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
    </div>
  );
};

function NoteFooter({ language }: { language: string }) {
  return (
    <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3 ">
      <div className="flex gap-1 items-center">
        <JavascriptIcon
          fontSize={"medium"}
          className="mb-[2px]"
        ></JavascriptIcon>
        <span>{language}</span>
      </div>
      <DeleteIcon fontSize={"medium"} className="cursor-pointer"></DeleteIcon>
    </div>
  );
}
