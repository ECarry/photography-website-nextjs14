import { Metadata } from "next"

import { SidebarNav } from "./_components/sidebar-nav"
import PageHeader from "../../_components/PageHeader"

export const metadata: Metadata = {
  title: "Settings - ECarry Photography",
  description: "Settings",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Categary",
    href: "/settings/categary",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 pb-16">
        <PageHeader
          title="Settings"
          desc="Manage your account settings and set e-mail preferences."
          showButton={false}
        />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
