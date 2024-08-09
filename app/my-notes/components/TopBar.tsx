"use client";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SearchBar from "./Searchbar";
import UserProfile from "./UserProfile";

const TopBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 relative">
      {!isMobile && <></>}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%]">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
