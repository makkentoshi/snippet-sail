"use client";
import { useTheme } from "@/components/components/context/ThemeContext";
import TopBar from "./topBar/TopBar";

import classNames from "classnames";

const ContextArea = () => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames("sm:w-[60%] mx-auto p-5", {
        "bg-slate-900 text-white": theme === "dark",
        "bg-slate-100 text-slate-500": theme === "light",
      })}
    >
      <TopBar />
    </div>
  );
};

export default ContextArea;
