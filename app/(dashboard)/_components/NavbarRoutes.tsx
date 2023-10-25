import NavbarItem from "./NavbarItem"

const guestRoutes = [
  {
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    label: 'Gallery',
    href: '/gallery'
  },
  {
    label: 'Albums',
    href: '/albums'
  },
  {
    label: 'Settings',
    href: '/settings'
  }
]

const SidebarRoutes = () => {
  const routes = guestRoutes

  return (
    <div className="flex gap-4">
      {routes.map((route) => (
        <NavbarItem 
        key={route.label}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
