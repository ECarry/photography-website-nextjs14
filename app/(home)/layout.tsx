import Sidebar from "./_components/Sidebar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  )
}

export default HomeLayout
