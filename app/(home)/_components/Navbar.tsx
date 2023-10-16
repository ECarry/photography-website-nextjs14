import Logo from '@/components/Logo'
import Icon from '@/components/icons'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='z-50 w-full'>
      <div className='flex items-center'>
        {/* LOGO  */}
        <Link href='/'>
          <Logo />
        </Link>

        {/* NAV  */}

        {/* ICON  */}
        <div className='flex items-center gap-2'>
          <Icon 
          name='github'
          animated='HOVER'
          loop
          size={28}
          />

          <Icon 
            name='twitter'
            animated='HOVER'
            loop
            size={28}
          />

          <Icon 
            name='instagram'
            animated='HOVER'
            loop={false}
            size={28}
          />
        </div>
      </div>

      
    </div>
  )
}

export default Navbar
