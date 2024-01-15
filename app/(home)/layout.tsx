import Sidebar from "./_components/Sidebar"

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
