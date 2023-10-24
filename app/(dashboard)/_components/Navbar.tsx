import SidebarRoutes from './NavbarRoutes'
import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'
import MoblieNavToggle from '@/components/MoblieNavToggle'

const links = [
  {
    label: 'Dashboard',
    link: '/dashboard'
  }
]

const Sidebar = () => {
  return (
    <div className='w-full h-14 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
      <div className='flex items-center justify-end md:justify-between py-2 px-4'>

      <div className='hidden md:block'>
        <SidebarRoutes />
      </div>

      <div className='flex items-center gap-2'>
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
