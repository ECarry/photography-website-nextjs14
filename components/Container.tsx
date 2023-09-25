const Container = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="mx-auto max-w-8xl">
      {children}
    </div>
  )
}

export default Container
