import SidebarItem from "./SidebarItem"

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
    label: 'Alumbs',
    href: '/alumbs'
  },
  {
    label: 'Settings',
    href: '/settings'
  }
]

const SidebarRoutes = () => {
  const routes = guestRoutes

  return (
    <div className='bg-[#1d1d1d] py-3 px-6 rounded-full flex gap-6'>
      {routes.map((route) => (
        <SidebarItem 
        key={route.label}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SidebarRoutes
