import SidebarRoutes from './NavbarRoutes'
import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'
import MoblieNavToggle from '@/components/MoblieNavToggle'
import Link from 'next/link'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  {
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    label: 'Gallery',
    href: '/gallery'
  },
  {
    label: 'Albums',
    href: '/albums'
  },
  {
    label: 'Settings',
    href: '/settings'
  },
]

const Sidebar = () => {
  return (
    <div className='w-full h-14 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
      <div className='flex items-center justify-end md:justify-between p-2 md:px-4'>

        <div className='hidden md:block'>
          <SidebarRoutes />
        </div>

        <div className='flex items-center md:gap-2'>
          <Button variant='ghost' size='icon'>
            <Link href='/'>
              <Send size={20} />
            </Link>
          </Button>
          
          <ThemeToggle />
          <div className='hidden md:block'>
            <UserAvatar />
          </div>

          <div className='md:hidden'>
            <MoblieNavToggle links={links} side='right' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
