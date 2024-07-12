"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

const Filter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const year = params.get("year") || "all";
  const pathname = usePathname();

  const onChange = (newValue: string) => {
    const query = {
      year: newValue,
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
    <div className="w-full flex items-center gap-2">
      <Select onValueChange={onChange} value={year}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>All Years</SelectItem>
          <SelectItem value={"2022"}>2022</SelectItem>
          <SelectItem value={"2023"}>2023</SelectItem>
          <SelectItem value={"2024"}>2024</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
