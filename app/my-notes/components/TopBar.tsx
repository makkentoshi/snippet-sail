"use client";

import SearchBar from "./Searchbar";

const TopBar = () => {
  return (
    <div className=" bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full">
        <SearchBar />
      </div>
    </div>
  );
};

export default TopBar;
