import Navbar from "./_components/Navbar"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s - Dashboard',
    default: 'Dashboard',
  },
};

const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <>
      <Navbar />
      <div className="container p-4">
        {children}
      </div>
    </>
  )
}

export default DashboardLayout
