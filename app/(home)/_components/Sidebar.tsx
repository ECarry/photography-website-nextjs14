import Link from "next/link"


const Navbar = () => {

  return (
    <div className="p-[50px] fixed flex flex-col gap-8">
      <Link href={'/'} className="text-2xl font-semibold">ECarry</Link>

      <nav className="flex flex-col text-[#1F1F1F] gap-8">
        <ul>
          <li className="group cursor-pointer"><Link href={'/'} className="group-hover:text-[#A3A3A3] transition-colors duration-150">Home</Link></li>
          <li className="group cursor-pointer"><Link href={'/grid'} className="group-hover:text-[#A3A3A3] transition-colors duration-150">Grid</Link></li>
          <li className="group cursor-pointer"><Link href={''} className="group-hover:text-[#A3A3A3] transition-colors duration-150">Human/Nature</Link></li>
          <li className="group cursor-pointer"><Link href={'/map'} className="group-hover:text-[#A3A3A3] transition-colors duration-150">Map</Link></li>
        </ul>
        <ul className="text-[13px]">
          <li><Link href={''}>Blog</Link></li>
          <li><Link href={''}>Contact</Link></li>
          <li><Link href={''}>Read Me</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
