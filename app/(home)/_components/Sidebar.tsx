import Icon from "@/components/icons"
import { Menu } from "lucide-react"
import Link from "next/link"

const Navbar = () => {

  return (
    <nav 
      className="w-[60px] h-screen grid grid-rows-3 py-5 justify-items-center fixed backdrop-blur-sm"
    >
      <Menu />
      
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
