import Navbar from "./_components/Navbar"

const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      <div className="container py-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
