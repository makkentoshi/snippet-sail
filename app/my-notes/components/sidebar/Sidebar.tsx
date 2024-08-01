"use client";
import Languages from "./Languages";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";
import classNames from "classnames";
import { useTheme } from "../../../../components/components/context/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "lg:w-[20%] p-5 flex flex-col gap-2 h-screen pt-7 border-r sm:w-[50%]",
        {
          "bg-slate-900 text-white": theme === "dark",
          "bg-white text-slate-500": theme === "light",
        }
      )}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );
};

export default Sidebar;
