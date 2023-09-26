import Container from "@/components/Container"
import Sidebar from "./_components/Sidebar"

const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <div className="h-full p-6">
      <Container>
        <div className="w-full h-[78px] z-50 mb-6">
          <Sidebar />
        </div>
        {children}
      </Container>
    </div>
  )
}

export default DashboardLayout
