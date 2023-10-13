import React from 'react'

import SidebarRoutes from './SidebarRoutes'
import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'
import Logo from '@/components/Logo'


const Sidebar = () => {
  return (
    <div className='h-full w-full bg-[#f5f5f5] dark:bg-black rounded-2xl flex items-center px-6 justify-between'>
      <Logo />

      <div>
        <SidebarRoutes />
      </div>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <UserAvatar />
      </div>
      
    </div>
  )
}

export default Sidebar
