import React from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Searchbar";

const page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        {/* Your main content goes here */}
        <div className="flex-1 p-4">
          {/* Example content */}
          <h1 className="text-2xl font-bold">My Notes</h1>
          <p>Your notes content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default page;
