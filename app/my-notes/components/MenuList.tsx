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
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface MenuListProps {
  setSelectedLanguage: Dispatch<SetStateAction<string | null>>;
}

const MenuList: React.FC<MenuListProps> = ({ setSelectedLanguage }) => {
  const router = useRouter();

  const handleClick = (e: { key: string }) => {
    switch (e.key) {
      case "home":
        router.push("/");
        break;
      case "chat":
        router.push("/chat");
        break;
      case "all":
        router.push("/snippets/all");
        break;
      case "pythonsnippets":
        router.push("/snippets/python");
        break;
      case "jssnippets":
        router.push("/snippets/javascript");
        break;
      case "csssnippets":
        router.push("/snippets/css");
        break;
      case "java":
        router.push("/snippets/java");
        break;
      case "donate":
        router.push("/donate");
        break;
      case "settings":
        router.push("/settings");
        break;
      default:
        break;
    }
  };
  return (
    <Menu
      className="h-[88vh] mt-[2rem] flex flex-col gap-[15px] text-[1rem]  font-semibold   "
      mode="inline"
      style={{ width: 256 }}
      onClick={handleClick}
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
          onClick={() => setSelectedLanguage("Python")}
        >
          <span>Python</span>
        </Menu.Item>
        <Menu.Item
          key="jssnippets"
          icon={<JavaScriptOutlined className="text-[#31267a]" />}
          onClick={() => setSelectedLanguage("JavaScript")}
        >
          <span>JavaScript</span>
        </Menu.Item>
        <Menu.Item
          key="csssnippets"
          icon={<Html5Outlined className="text-[#31267a]" />}
          onClick={() => setSelectedLanguage("HTML & CSS")}
        >
          <span>HTML & CSS</span>
        </Menu.Item>
        <Menu.Item
          key="java"
          icon={<JavaOutlined className="text-[#31267a]" />}
          onClick={() => setSelectedLanguage("Java")}
        >
          <span>Java</span>
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
