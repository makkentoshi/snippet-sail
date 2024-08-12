"use client";

import BorderAll from "@mui/icons-material/BorderAll";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LightMode from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { SingleNoteType, SingleTagType } from "./app/Types";

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

  isMobileObject: {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  };

  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  };

  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<
      React.SetStateAction<SingleNoteType | null>
    >;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
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
  isMobileObject: {
    isMobile: false,
    setIsMobile: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
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
  const [openContentNote, setOpenContentNote] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [allTags, setAllTags] = useState<SingleTagType[]>([])
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function updateAllNotes() {
      const allNotes = [
        {
          _id: "1",
          title: "This is a note",
          isFavorite: false,
          tags: ["tag1", "tag2"],
          description: "This is a note 1",
          code: `function SingleNote() {
            return (
              <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[320px] py-4 bg-white shadow-md">
                <NoteHeader></NoteHeader>
                <NoteDate></NoteDate>
                <NoteTags></NoteTags>
                <NoteDescription></NoteDescription>
                <Code language="javascript"></Code>
                <NoteFooter></NoteFooter>
              </div>
            );
          }`,
          language: "javascript",
          creationDate: "2022-02-01",
        },
        {
          _id: "2",
          title: "This is a note",
          isFavorite: false,
          tags: ["tag1", "tag2"],
          description: "This is a note 2",
          code: `function SingleNote() {
            return (
              <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[320px] py-4 bg-white shadow-md">
                <NoteHeader></NoteHeader>
                <NoteDate></NoteDate>
                <NoteTags></NoteTags>
                <NoteDescription></NoteDescription>
                <Code language="javascript"></Code>
                <NoteFooter></NoteFooter>
              </div>
            );
          }`,
          language: "javascript",
          creationDate: "2022-02-01",
        },
        {
          _id: "3",
          title: "This is a note 3",
          isFavorite: false,
          tags: ["tag1", "tag2"],
          description: "This is a note",
          code: `function SingleNote() {
            return (
              <div className="max-sm:w-full rounded-xl flex flex-col justify-between w-[320px] py-4 bg-white shadow-md">
                <NoteHeader></NoteHeader>
                <NoteDate></NoteDate>
                <NoteTags></NoteTags>
                <NoteDescription></NoteDescription>
                <Code language="javascript"></Code>
                <NoteFooter></NoteFooter>
              </div>
            );
          }`,
          language: "javascript",
          creationDate: "2022-02-01",
        },
      ];

      setTimeout(() => {
        setAllNotes(allNotes);
      }, 1200);
    }
    function updateAllTags() {
      const allTags = [
        {
          _id: uuidv4(),
          name: "tag1",
        },
        {
          _id: uuidv4(),
          name: "tag2",
        },
        {
          _id: uuidv4(),
          name: "tag3",
        },
      ];
      setAllTags(allTags);
    }
    updateAllTags()
    updateAllNotes();
  }, []);

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
        isMobileObject: { isMobile, setIsMobile },
        allNotesObject: { allNotes, setAllNotes },
        selectedNoteObject: { selectedNote, setSelectedNote },
        isNewNoteObject: { isNewNote, setIsNewNote },
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
