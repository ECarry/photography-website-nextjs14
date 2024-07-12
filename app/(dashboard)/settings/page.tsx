import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  return (
    <section className="p-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">User account</h1>
        <p className="text-muted-foreground text-sm">
          Update your photo and personal details here.
        </p>
      </div>
      <div className="flex items-center gap-8">
        <Avatar className="size-20 cursor-pointer relative">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">ECarry</h1>
          <p className="text-muted-foreground text-sm">
            lianshiliang93@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
