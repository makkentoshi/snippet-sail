'use client'
import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ContextArea from "./components/ContextArea";

const page = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1">
          <ContextArea />
        </div>
      </div>
    </div>
  );
};

export default page;
