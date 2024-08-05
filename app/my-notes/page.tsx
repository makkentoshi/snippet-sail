"use client";
import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import ContextArea from "./components/ContextArea";
import MobileTopbar from "./components/MobileSideBar";

const Page = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setCollapsed(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {isMobile && <MobileTopbar collapsed={collapsed} setCollapsed={setCollapsed} />}
      {!isMobile && (
        <div className="flex flex-row">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="flex-1 flex flex-col">
            <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 overflow-auto">
              <ContextArea />
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="flex-1 flex flex-col mt-14">
          <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="flex-1 overflow-auto">
            <ContextArea />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;