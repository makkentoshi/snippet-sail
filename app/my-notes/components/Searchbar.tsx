"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserProfile from "@/app/my-notes/components/UserProfile";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div className="flex w-full bg-white rounded-[15px] justify-between h-[70px] items-center px-1">
      <div className="flex p-2">
        <UserProfile />
      </div>
      <div className="pl-3 w-[60%] h-[38px] bg-slate-100 rounded-3xl flex items-center gap-2 p-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full outline-none text-sm bg-slate-100 text-slate-500 "
          placeholder="Search a snippet "
        />
        <Button
          onClick={handleSearch}
          className="bg-[#31267a] text-white rounded-[40px] p-3 flex justify-center items-center hover:bg-blue-700 transition-all "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
