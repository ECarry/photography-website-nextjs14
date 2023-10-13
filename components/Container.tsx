const Container = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto max-w-[1440px]">
      {children}
    </div>
  )
}

export default Container
