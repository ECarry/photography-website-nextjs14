import Navbar from "./_components/Navbar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='flex h-[100vh] items-stretch'>
      <Navbar />
      {children}
    </div>
  )
}

export default HomeLayout
