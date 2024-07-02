import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative ml-8">
      <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search here..." className="pl-8 rounded-full h-8" />
    </div>
  );
};

export default SearchBar;
