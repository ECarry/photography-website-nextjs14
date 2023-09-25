const DashboardLayout = ({
  children
}: {
  children:React.ReactNode
}) => {
  return (
    <div className="h-full bg-rose-500">
      {children}
    </div>
  )
}

export default DashboardLayout
