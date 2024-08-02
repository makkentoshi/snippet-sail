'use client';
import { useState } from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import Languages from "./Languages";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";
import ThemeToggle from "../../../../components/components/ThemeToggle";
import classNames from "classnames";
import { useTheme } from "../../../../components/components/context/ThemeContext";

const Sidebar = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="p-5 flex flex-col gap-2 h-screen pt-7 border-r w-full sm:w-[40%]">
        <div className="flex justify-between items-center sm:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <ThemeToggle />
        </div>
        <div className={classNames("sm:block", { hidden: !isOpen })}>
          <Logo />
          <QuickLinks />
          <Languages />
        </div>
      </div>
    </>
  );
};

export default Sidebar;