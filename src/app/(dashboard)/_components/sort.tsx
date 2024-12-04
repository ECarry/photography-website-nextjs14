"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";

const Sort = () => {
  const router = useRouter();
  const params = useSearchParams();
  const sortBy = params.get("sortBy") || "tookDesc";
  const pathname = usePathname();

  const onChange = (newValue: string) => {
    const query = {
      sortBy: newValue,
    };

    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };
  return (
    <div className="text-sm font-light text-muted-foreground tracking-wide subpixel-antialiased flex items-center gap-x-1 ml-auto">
      <div className="flex items-center gap-x-2 text-sm md:text-sm">
        <h1>Sort by</h1>
        <Select onValueChange={onChange} value={sortBy}>
          <SelectTrigger className="w-auto ring-0 focus:ring-0 focus:ring-offset-0 outline-none border-0 focus:border-0 focus:outline-none p-0">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="end" className="text-sm text-muted-foreground">
            <SelectItem value="tookDesc">Took (newest first)</SelectItem>
            <SelectItem value="tookAsc">Took (oldest first)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Toggle defaultPressed size="sm" aria-label="Toggle grid">
        <Icons.layoutGrid size={16} />
      </Toggle>
      <Toggle size="sm" aria-label="Toggle list">
        <Icons.list size={16} />
      </Toggle>
    </div>
  );
};

const SortBar = () => {
  return <Sort />;
};

export default SortBar;
