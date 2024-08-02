"use client";
import React from "react";
import ProfileUser from "./ProfileUser";
import SearchBar from "./SearchBar";
import ThemeToggle from "@/components/components/ThemeToggle";
import { useTheme } from "@/components/components/context/ThemeContext";
import classNames from "classnames";

const TopBar = () => {
  const { theme } = useTheme();
  return (
    <div
      className={classNames("rounded-lg flex justify-between items-cente p-3 border-b", {
        "bg-slate-800 text-white border-slate-800": theme === "dark",
        "bg-white text-slate-500": theme === "light",
      })}
    >
      <ProfileUser></ProfileUser>
      <SearchBar></SearchBar>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default TopBar;
