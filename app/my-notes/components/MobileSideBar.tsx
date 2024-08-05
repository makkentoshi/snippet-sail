"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HomeOutlined,
  AppstoreOutlined,
  PayCircleOutlined,
  SettingOutlined,
  BarsOutlined,
  CreditCardOutlined,
  JavaScriptOutlined,
  PythonOutlined,
  Html5Outlined,
  JavaOutlined,
  AlignLeftOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const MobileTopbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  const [current, setCurrent] = useState("mail");
  return (
    <div className="w-full h-14 bg-white flex items-center px-4 shadow-md fixed top-0 left-0 z-20">
      <Button>
        <Menu mode="horizontal" onClick={() => {}} selectedKeys={[current]}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="chat" icon={<AppstoreOutlined />}>
            Chat
          </Menu.Item>
          <Menu.SubMenu
            key="subsnippets"
            icon={<BarsOutlined />}
            title="Snippets"
          >
            <Menu.Item key="all" icon={<AlignLeftOutlined />}>
              <span className="">All Snippets</span>
            </Menu.Item>
            <Menu.Item key="pythonsnippets" icon={<PythonOutlined />}>
              <span className="">Python</span>
            </Menu.Item>
            <Menu.Item key="jssnippets" icon={<JavaScriptOutlined />}>
              <span className="">JavaScript</span>
            </Menu.Item>

            <Menu.Item key="csssnippets" icon={<Html5Outlined />}>
              <span className="">HTML & CSS</span>
            </Menu.Item>
            <Menu.Item key="java" icon={<JavaOutlined />}>
              <span className="">Java</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="donate" icon={<CreditCardOutlined />}>
            Donate
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Button>
      {/* <span className="text-lg font-semibold">Menu</span> */}
    </div>
  );
};

export default MobileTopbar;
