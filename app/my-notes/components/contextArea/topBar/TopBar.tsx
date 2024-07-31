import React from "react";
import ProfileUser from "./ProfileUser";
import SearchBar from "./SearchBar";

const TopBar = () => {
  return (
    <div className="rounded-lg flex jusitfy-between items-center bg-white p-3">
      <ProfileUser></ProfileUser>
      <SearchBar></SearchBar>
    </div>
  );
};

export default TopBar;
