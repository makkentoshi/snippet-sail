export interface SingleNoteType {
  _id: string;
  title: string;
  isFavorite: boolean;
  tags: string[];
  description: string;
  code: string;
  language: string;
  creationDate: string;
}

export interface SingleTagType {
  _id: string;
  name: string;
}

export interface SideBarMenu {
  id: number;
  name: string;
  isSelected: boolean;
  icons: React.ReactNode;
}
