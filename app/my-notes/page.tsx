"use client";
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

const page = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
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
