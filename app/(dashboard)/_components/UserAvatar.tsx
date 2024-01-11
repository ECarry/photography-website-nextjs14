import { signOut } from "@/auth";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

const UserAvatar = async () => {
  const user = await currentUser()

  if(!user) {
    return redirect('/api/auth/signin')
  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image || ''} alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
        <form action={async() => {
          'use server'

          await signOut()
        }}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full h-full cursor-pointer">
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserAvatar
