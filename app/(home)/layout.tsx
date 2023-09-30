import Navbar from "./_components/Navbar"

const HomeLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default HomeLayout
