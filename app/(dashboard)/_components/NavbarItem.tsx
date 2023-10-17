'use client'

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation'

interface SidebarItemProps {
  label: string;
  href: string;
}

const SidebarItem = ({
  label,
  href
}: SidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (
    pathname === '/' && href === '/' ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)
  )

  const onClick = () => {
    router.push(href)
  }
  return (
    <button
      onClick={onClick}
      type='button'
    >
      <div className={cn(
        'text-gray-400 text-sm font-semibold hover:text-gray-100 transition duration-150',
        isActive && 'text-gray-100'
      )}>
        {label}
      </div>
    </button>
  )
}

export default SidebarItem
