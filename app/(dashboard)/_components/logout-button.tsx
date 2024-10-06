import { signOut } from "@/auth";
import { Icons } from "@/components/icons";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/auth/login",
        });
      }}
    >
      <DropdownMenuItem>
        <button className="flex items-center w-full">
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </button>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </form>
  );
};

export default LogoutButton;
