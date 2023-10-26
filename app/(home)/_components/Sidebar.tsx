import Link from "next/link"

import MoblieNavToggle from "@/components/MoblieNavToggle"
import Icon from "@/components/icons"

const links = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Gallery',
    href: '/gallery'
  },
  {
    label: 'Fan',
    href: '/fan'
  },
  {
    label: 'Map',
    href: '/map'
  },
]

const Navbar = () => {

  return (
    <nav 
      className="w-[60px] h-screen grid grid-rows-3 py-5 justify-items-center fixed backdrop-blur-sm z-50"
    >
      <MoblieNavToggle links={links} side="left" />
      
      <Link href='/'>
        <h1 
          style={{ writingMode: 'vertical-rl' }}
          className="
            self-center 
            text-xl 
            font-bold 
            tracking-wide 
            uppercase 
            rotate-180
          ">
            ECarry
        </h1>
      </Link>

      <div className="self-end flex flex-col gap-4">
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
    </nav>
  )
}

export default Navbar
