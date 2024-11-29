import {
  type Icon as LucidIcon,
  ArrowUpRight,
  Home,
  Settings,
  Upload,
  Cloud,
  Github,
  LogOut,
  User,
  Heart,
  MapPin,
  Loader2,
  Search,
  LayoutGrid,
  List,
  Save,
  Trash,
  TimerIcon,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Circle,
  ImageUp,
} from "lucide-react";
import { BiPhotoAlbum } from "react-icons/bi";

export type Icon = typeof LucidIcon;

export const Icons = {
  home: Home,
  photos: BiPhotoAlbum,
  settings: Settings,
  arrowUpRight: ArrowUpRight,
  upload: Upload,
  cloud: Cloud,
  github: Github,
  logout: LogOut,
  user: User,
  heart: Heart,
  mapPin: MapPin,
  loader: Loader2,
  search: Search,
  layoutGrid: LayoutGrid,
  list: List,
  save: Save,
  trash: Trash,
  time: TimerIcon,
  x: X,
  check: Check,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  circle: Circle,
  chevronRight: ChevronRight,
  share: ImageUp,
  close: X,
};