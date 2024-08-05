"use client";

import BorderAll from "@mui/icons-material/BorderAll";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import React, { createContext, useContext, useState } from "react";

import LightMode from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

interface DarkModeType {
  id: number;
  icon: React.ReactNode;
  isSelected: boolean;
}

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };
  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openContentNoteObject: {
    openContentNote: boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  openContentNoteObject: {
    openContentNote: false,
    setOpenContentNote: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "All Snippets",
      isSelected: true,
      icons: <BorderAll sx={{ fontSize: 19 }} />,
    },
    {
      id: 2,
      name: "Favorites",
      isSelected: false,
      icons: <FavoriteBorder sx={{ fontSize: 19 }} />,
    },
    {
      id: 3,
      name: "Trash",
      isSelected: false,
      icons: <DeleteOutlineOutlined sx={{ fontSize: 19 }} />,
    },
    {
      id: 4,
      name: "Log Out",
      isSelected: false,
      icons: <LogoutIcon sx={{ fontSize: 19 }} />,
    },
  ]);

  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      icon: (
        <LightMode sx={{ fontSize: 18 }} className="text-black"></LightMode>
      ),
      isSelected: false,
    },
    {
      id: 2,
      icon: <DarkModeIcon sx={{ fontSize: 18 }}></DarkModeIcon>,
      isSelected: false,
    },
  ]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [openContentNote, setOpenContentNote] = useState(true);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: {
          sideBarMenu,
          setSideBarMenu,
        },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { openSideBar, setOpenSideBar },
        openContentNoteObject: { openContentNote, setOpenContentNote },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
