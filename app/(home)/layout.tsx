import Sidebar from "./_components/Sidebar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex h-[100vh] items-stretch'>
      <Sidebar />
      {children}
    </div>
  )
}

export default HomeLayout
