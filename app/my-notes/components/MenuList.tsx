"use client";
import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PayCircleOutlined,
  SettingOutlined,
  BarsOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const MenuList = () => {

  return (
    <Menu className="h-[88vh] mt-[2rem] flex flex-col gap-[15px] text-[1rem] ">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="chat" icon={<AppstoreOutlined />}>
        Chat
      </Menu.Item>
      <Menu.SubMenu key="subsnippets" icon={<BarsOutlined />} title="Snippets">
        <Menu.Item key="pythonsnippets">Python</Menu.Item>
        <Menu.Item key="jssnippets">JavaScript</Menu.Item>
        <Menu.Item key="csharp">C#</Menu.Item>
        <Menu.Item key="csssnippets">CSS</Menu.Item>
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
