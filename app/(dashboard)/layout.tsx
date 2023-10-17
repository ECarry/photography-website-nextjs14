import Navbar from "./_components/Navbar"

const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <div className="container h-full p-6">
      <div className="w-full h-[78px] z-50 mb-6">
        <Navbar />
      </div>
      {children}
    </div>
  )
}

export default DashboardLayout
