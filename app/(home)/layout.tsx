import Sidebar from "./_components/Sidebar"
import NavMobile from "./_components/nav-mobile"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Sidebar />
      <NavMobile />
      {children}
    </div>
  )
}

export default HomeLayout
