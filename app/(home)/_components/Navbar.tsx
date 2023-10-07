import Icon from '@/components/icons'
import React from 'react'

const Navbar = () => {
  return (
    <div>
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
  )
}

export default Navbar
