interface PhotoIdPageProps {
  params: {
    id: string
  }
}

const PhotoIdPage = ({
  params
}: PhotoIdPageProps) => {
  const { id } = params

  return (
    <div className='flex items-center justify-center h-screen text-3xl'>
      photo id: {id}
    </div>
  )
}

export default PhotoIdPage
