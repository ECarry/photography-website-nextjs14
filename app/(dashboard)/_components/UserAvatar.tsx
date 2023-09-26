import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs';

const UserAvatar = async () => {
  const user = await currentUser()
  
  return (
    <Avatar>
      <AvatarImage src={user?.imageUrl} alt="@shadcn" className='hidden' />
      <UserButton afterSignOutUrl="/"/>
      <AvatarFallback>{user?.firstName || 'EC'}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
