"use client";
// External dependencies
import { useSession, signOut } from "next-auth/react";
// Internal dependencies - UI Components
import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data?.user?.name) {
    return null;
  }

  const name = session.data.user.name;
  const imageUrl = session.data.user.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opcaity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
