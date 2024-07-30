import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative ml-8">
      <Icons.search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search here..." className="pl-8 rounded-full h-8" />
    </div>
  );
};

export default SearchBar;
