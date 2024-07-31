import React from "react";
import ProfileUser from "./ProfileUser";
import SearchBar from "./SearchBar";
import DarkMode from "@mui/icons-material/DarkMode";

const TopBar = () => {
  return (
    <div className="rounded-lg flex justify-between items-center bg-white p-3 gap-2">
      <ProfileUser></ProfileUser>
      <SearchBar></SearchBar>
      <DarkMode></DarkMode>
    </div>
  );
};

export default TopBar;
