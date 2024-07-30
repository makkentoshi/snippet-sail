import React from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const QuickLinks = () => {
  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        <li className="flex gap-1 items-center bg-blue-600 text-white p-[7px] px-2 w-[60%]  py-3 rounded-[7px] cursor-pointer">
          <BorderAllIcon sx={{ fontSize: 18 }}></BorderAllIcon>
          <span>All Snippets</span>
        </li>

        <li className="flex gap-1 items-center text-slate-400 p-[7px] px-2 w-[60%] py-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-[7px]">
          <FavoriteBorderIcon sx={{ fontSize: 18 }}></FavoriteBorderIcon>
          <span>Favorites</span>
        </li>

        <li className="flex gap-1 items-center text-slate-400 p-[7px] px-2 w-[60%] py-3 cursor-pointer hover:bg-blue-600 hover:text-white transition-all rounded-[7px]">
          <DeleteOutlineOutlinedIcon
            sx={{ fontSize: 18 }}
          ></DeleteOutlineOutlinedIcon>
          <span>Trash</span>
        </li>
      </ul>
    </div>
  );
};

export default QuickLinks;
