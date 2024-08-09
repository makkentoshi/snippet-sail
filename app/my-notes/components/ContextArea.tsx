import React from "react";
import AllNotesSection from "./AllNotesSection";
import ContentNote from "./ContentNote";

const ContextArea = () => {
  return (
    <div className=" bg-gray-100 w-full h-full p-5 pl-[10%] ">
      <AllNotesSection></AllNotesSection>
    </div>
  );
};

export default ContextArea;
