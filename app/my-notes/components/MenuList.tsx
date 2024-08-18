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
      className="h-[88vh] mt-[2rem] flex flex-col gap-[15px] text-[1rem]  font-semibold   "
      mode="inline"
      style={{ width: 256 }}
    >
      <Menu.Item key="home" icon={<HomeOutlined className="text-[#31267a]" />}>
        Home
      </Menu.Item>
      <Menu.Item
        key="chat"
        icon={<AppstoreOutlined className="text-[#31267a]" />}
      >
        Chat
      </Menu.Item>
      <Menu.SubMenu
        key="subsnippets"
        icon={<BarsOutlined className="text-[#31267a]" />}
        title="Filter"
      >
        <Menu.Item key="all" icon={<AlignLeftOutlined />}>
          <span className="">All Snippets</span>
        </Menu.Item>
        <Menu.Item
          key="pythonsnippets"
          icon={<PythonOutlined className="text-[#31267a]" />}
        >
          <span className="">Python</span>
        </Menu.Item>
        <Menu.Item
          key="jssnippets"
          icon={<JavaScriptOutlined className="text-[#31267a]" />}
        >
          <span className="">JavaScript</span>
        </Menu.Item>

        <Menu.Item
          key="csssnippets"
          icon={<Html5Outlined className="text-[#31267a]" />}
        >
          <span className="">HTML & CSS</span>
        </Menu.Item>
        <Menu.Item
          key="java"
          icon={<JavaOutlined className="text-[#31267a]" />}
        >
          <span className="">Java</span>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item
        key="donate"
        icon={<CreditCardOutlined className="text-[#31267a]" />}
      >
        Donate
      </Menu.Item>
      <Menu.Item
        key="settings"
        icon={<SettingOutlined className="text-[#31267a]" />}
      >
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
