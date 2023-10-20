import React from 'react'

import SidebarRoutes from './NavbarRoutes'
import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'
import Logo from '@/components/Logo'
import { Menu } from 'lucide-react'
import MoblieNavToggle from '@/components/MoblieNavToggle'

const links = [
  {
    label: 'Dashboard',
    link: '/dashboard'
  }
]

const Sidebar = () => {
  return (
    <div className='h-full w-full bg-[#f5f5f5] dark:bg-black rounded-2xl flex items-center px-6 justify-between'>
      <Logo />

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
  )
}

export default Sidebar
