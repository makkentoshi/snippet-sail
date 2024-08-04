import React from "react";

interface SingleNoteProps {
  // Define the props for your component here
}

const SingleNote: React.FC<SingleNoteProps> = () => {
  return (
    <div className="max-sm:w-full rounded-xl flex justify-between ">
      <div className="flex justify-between mx-4">
        <span className="font-bold text-lg w-[87%]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          voluptatibus
        </span>
      </div>
    </div>
  );
};

export default SingleNote;
