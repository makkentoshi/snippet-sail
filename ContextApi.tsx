"use client";

import BorderAll from "@mui/icons-material/BorderAll";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { createContext, useContext, useState } from "react";

interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
}

const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
});

export default function GlobalContextType({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: "Home",
      isSelected: true,
      icons: <BorderAll />,
    },
    {
      id: 2,
      name: "About",
      isSelected: false,
      icons: <FavoriteBorder />,
    },
    {
      id: 3,
      name: "Contact",
      isSelected: false,
      icons: <DeleteOutlineOutlined />,
    },
  ]);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: {
          sideBarMenu,
          setSideBarMenu,
        },
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
