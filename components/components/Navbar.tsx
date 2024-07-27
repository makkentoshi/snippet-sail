"use client";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Buttons from "./Buttons";
const Navbar = () => {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <div className="flex gap-2 items-center logo">
        <div className={`bg-[#31267a] p-[6px] rounded-md`}>
          <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
        </div>
        <div className="flex gap-1 text-[19px]">
          <span className={`font-bold text-[#31267a]`}>Snippet</span>
          <span className="text-slate-600">Sail</span>
        </div>
      </div>
      <Buttons></Buttons>
    </div>
  );
};

export default Navbar;
