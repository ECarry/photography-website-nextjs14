import { Home, Settings, type Icon as LucidIcon } from "lucide-react";
import { BiPhotoAlbum } from "react-icons/bi";

export type Icon = typeof LucidIcon;

export const Icons = {
  home: Home,
  photos: BiPhotoAlbum,
  settings: Settings,
};
