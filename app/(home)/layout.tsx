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

      <div className="container">
        {children}
      </div>


    </div>
  )
}

export default HomeLayout
