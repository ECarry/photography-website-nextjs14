import Navbar from "./_components/Navbar"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s - Dashboard - ECarry Photography',
    default: 'Dashboard - ECarry Photography',
  },
};

const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <div>
      <Navbar />
      <div className="container p-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
