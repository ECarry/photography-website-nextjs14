import MoblieNavToggle from "@/components/MoblieNavToggle"
import Sidebar from "./_components/Sidebar"
import { links } from "./_components/routes"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="">
      <Sidebar />
      {children}
    </div>
  )
}

export default HomeLayout
