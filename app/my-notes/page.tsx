"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import ContextArea from "./components/contextArea/ContextArea";
import { useTheme } from "@/components/components/context/ThemeContext";

const Page = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  }, [theme]);

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <ContextArea></ContextArea>
    </div>
  );
};

export default Page;
