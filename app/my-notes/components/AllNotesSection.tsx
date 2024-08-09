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
    openContentNoteObject: { openContentNote },
  } = useGlobalContext();
  const { title, creationDate } = note;

  return (
    <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[625px] py-4 bg-white shadow-md">
      <NoteHeader title={title}></NoteHeader>
      <NoteDate creationDate={creationDate}></NoteDate>
      <NoteTags></NoteTags>
      <NoteDescription></NoteDescription>
      <Code language="javascript"></Code>
      <NoteFooter></NoteFooter>
    </div>
  );
}

function NoteHeader({ title }: { title: string }) {
  const {
    openContentNoteObject: { setOpenContentNote },
  } = useGlobalContext();

  return (
    <div className="flex justify-between mx-4">
      <span
        className="font-bold text-lg w-[87%]"
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

function NoteDescription() {
  return (
    <div className="text-slate-600 text-[13px] mt-4 mx-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ea
      distinctio est fugiat modi debitis repellat nobis impedit doloribus velit?
    </div>
  );
}

const Code: React.FC<CodeBlockProps> = ({ language }) => {
  const codeString = `function SingleNote() {
    return (
      <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[320px] py-4 bg-white shadow-md">
        <NoteHeader></NoteHeader>
        <NoteDate></NoteDate>
        <NoteTags></NoteTags>
        <NoteDescription></NoteDescription>
        <Code language="javascript"></Code>
        <NoteFooter></NoteFooter>
      </div>
    );
  }`;

  return (
    <div className="rounded-[15px] overflow-hidden text-sm mx-4 mt-4">
      <SyntaxHighlighter language={language}>{codeString}</SyntaxHighlighter>
    </div>
  );
};

function NoteFooter() {
  return (
    <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3 ">
      <div className="flex gap-1 items-center">
        <JavascriptIcon
          fontSize={"medium"}
          className="mb-[2px]"
        ></JavascriptIcon>
        Javascript
      </div>
      <DeleteIcon fontSize={"medium"} className="cursor-pointer"></DeleteIcon>
    </div>
  );
}
