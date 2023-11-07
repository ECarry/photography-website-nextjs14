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
        'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
        isActive && 'text-primary'
      )}>
        {label}
      </div>
    </button>
  )
}

export default SidebarItem
