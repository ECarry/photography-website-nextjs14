import { fetchPhotoInfo } from "@/lib/data"

interface PhotoIdPageProps {
  params: {
    id: string
  }
}

const PhotoIdPage = async ({
  params
}: PhotoIdPageProps) => {
  const { id } = params

  const data = await fetchPhotoInfo(id)
  
  if (!data) {
    return null
  }

  return (
    <div className='flex items-center justify-center h-screen text-3xl'>
      photo id: {id}
      <h1>{data.title}</h1>
    </div>
  )
}

export default PhotoIdPage
