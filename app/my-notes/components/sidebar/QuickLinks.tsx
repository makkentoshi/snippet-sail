"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useGlobalContext } from "@/ContextApi";
import { useTheme } from "../../../../components/components/context/ThemeContext";

const QuickLinks = () => {
  const { theme } = useTheme();
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
  } = useGlobalContext();
  const [currentTheme, setCurrentTheme] = useState<string>("");

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const clickedMenu = (index: number) => {
    const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
      return {
        ...menu,
        isSelected: i === index,
      };
    });
    setSideBarMenu(updatedSideBarMenu);
  };

  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {sideBarMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedMenu(index)}
            className={classNames(
              "flex cursor-pointer select-none px-2 gap-1 items-center py-[10px] border-[0.2px] rounded-[4px] transition-all text-[15px] sm:text-sm",
              {
                "bg-slate-100": menu.isSelected,
                "hover:text-slate-400 text-slate-500 border-white":
                  !menu.isSelected && currentTheme === "light",
                "hover:text-slate-400 text-slate-400 border-slate-900":
                  !menu.isSelected && currentTheme === "dark",
              },
              currentTheme === "dark"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-500"
            )}
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
