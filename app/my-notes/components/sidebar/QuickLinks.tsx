"use client";
import React, { useState } from "react";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useGlobalContext } from "@/ContextApi";

const QuickLinks = () => {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
  } = useGlobalContext();

  function clickedMenu(index: number) {
    const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
      if (i === index) {
        return {
          ...menu,
          isSelected: true,
        };
      } else {
        return {
          ...menu,
          isSelected: false,
        };
      }
    });
    setSideBarMenu(updatedSideBarMenu);
  }

  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {sideBarMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedMenu(index)}
            className={`flex cursor-pointer select-none gap-1 items-center py-[10px] border-[7px] border-blue-600   hover:text-slate-400  rounded-[6px] transition-all text-[15px] sm:text-sm ${
              menu.isSelected ? "bg-blue-600 text-white" : "text-slate-500 border-white"
            }`}
          >
            {menu.icons}
            <span>{menu.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
