"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {

    console.log("Searching for:", query);
  };

  return (
    
    <div className="flex items-center  bg-white p-2 border border-gray-300 rounded-[35px]">
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 p-2 w-full"
        placeholder="Search snippet "
      />
      <Button
        onClick={handleSearch}
        className="bg-blue-800 text-white rounded-[40px] p-2 flex justify-center items-center hover:bg-blue-700 transition-all "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
      <UserButton />
    </div>
  );
};

export default SearchBar;
