import Link from 'next/link'

import { ArrowUpRight } from 'lucide-react'

import UserAvatar from './UserAvatar'
import { ThemeToggle } from '@/components/mode-toggle'
import MoblieNavToggle from '@/components/MoblieNavToggle'
import { Button } from '@/components/ui/button'
import NavbarItem from "./NavbarItem"

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
    label: 'Settings',
    href: '/settings'
  },
]

const Sidebar = () => {
  return (
    <div className='w-full h-14 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'>
      <div className='flex items-center justify-end md:justify-between p-2 md:px-4'>

        <div className='hidden md:block'>
          <div className="flex gap-4">
            {links.map((link) => (
              <NavbarItem 
              key={link.label}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>
        </div>

        <div className='flex items-center md:gap-2'>
          <Button variant='ghost' size='icon'>
            <Link href='/'>
              <ArrowUpRight size={20} />
            </Link>
          </Button>
          
          <ThemeToggle />
          
          <div className='h-10 w-10 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
            <UserAvatar />
          </div>
          


          <div className='md:hidden'>
            <MoblieNavToggle links={links} side='top' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
