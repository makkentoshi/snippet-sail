"use client";
import { useGlobalContext } from "@/ContextApi";
import { useEffect, useState } from "react";

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
  } = useGlobalContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  return (
    <div
      className={`fixed top-0 ${
        isMobile
          ? "left-1/2 top-1/2 w-4/5 h-4/5 transform -translate-x-1/2 -translate-y-1/2"
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
      
      ContentNote
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
