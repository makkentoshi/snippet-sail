"use client";
import React, { useState, useEffect } from "react";
import Sider from "antd/es/layout/Sider";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import MenuList from "./MenuList";

const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  return (
    <div className="">
      <Sider collapsed={collapsed} collapsible trigger={null}>
        <Logo collapsed={collapsed} />
        <MenuList />
      </Sider>
    </div>
  );
};

export default Sidebar;
