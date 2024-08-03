"use client";
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ContextArea from "./components/ContextArea";

const page = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* Your main content goes here */}
        <div className="flex-1">
          <ContextArea></ContextArea>
        </div>
      </div>
    </div>
  );
};

export default page;
