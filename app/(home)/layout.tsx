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
      <div className="ml-0 md:ml-[68px]">
        {children}
      </div>
    </div>
  )
}

export default HomeLayout
