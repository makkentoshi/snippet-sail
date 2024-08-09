"use client";
import { Menu } from "antd";
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
} from "@ant-design/icons";
import { useState } from "react";
import { TableCellsIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const MenuList = () => {
  return (
    <Menu
      className="h-[88vh] mt-[2rem] flex flex-col gap-[15px] text-[1rem]   "
      mode="inline"
      style={{ width: 256 }}
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="chat" icon={<AppstoreOutlined />}>
        Chat
      </Menu.Item>
      <Menu.SubMenu key="subsnippets" icon={<BarsOutlined />} title="Filter">
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
  );
};

export default MenuList;
