'use client'
import { useTheme } from "@/components/components/context/ThemeContext";
import TopBar from "./topBar/TopBar";
import classNames from "classnames";

const ContextArea = () => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames("invisible sm:w-[80%] sm:visible w-0 mx-auto", {
        "bg-slate-900 text-white": theme === "dark",
        "bg-white text-slate-500": theme === "light",
      })}
    >
      <TopBar></TopBar>
    </div>
  );
};

export default ContextArea;
