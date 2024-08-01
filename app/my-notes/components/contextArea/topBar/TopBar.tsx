import React from "react";
import ProfileUser from "./ProfileUser";
import SearchBar from "./SearchBar";
import ThemeToggle from "@/components/components/ThemeToggle";

const TopBar = () => {
  return (
    <div className="rounded-lg flex justify-between items-center bg-white p-3">
      <ProfileUser></ProfileUser>
      <SearchBar></SearchBar>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default TopBar;
