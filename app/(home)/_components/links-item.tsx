'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const LinksItem = ({
  label,
  href
}: {
  label: string;
  href: string;
}) => {
  const pathname = usePathname()

  const isActive = (
    pathname === '/' && href === '/' ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)
  )

  return (
    <li className="group cursor-pointer">
      <Link 
        href={href}
        prefetch
        className={cn(
          "group-hover:text-[#A3A3A3] transition-colors duration-150",
          isActive && 'text-[#A3A3A3]'
        )}
      >
        {label}
      </Link>
    </li>
  )
}

export default LinksItem
