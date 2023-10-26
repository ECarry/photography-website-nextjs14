import Sidebar from "./_components/Sidebar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {children}
    </div>
  )
}

export default HomeLayout
