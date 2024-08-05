"use client";
import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const MobileTopbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  return (
    <div className="w-full h-14 bg-gray-100 flex items-center px-4 shadow-md fixed top-0 left-0 z-20">
      <Button
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        className="mr-4"
      >
        <MenuFoldOutlined />
      </Button>
      <span className="text-lg font-semibold">Menu</span>
    </div>
  );
};

export default MobileTopbar;
