interface AlbumIdPageProps {
  params: {
    albumId: string;
  }
}

const AlbumIdPage = ({
  params
}: AlbumIdPageProps) => {
  return (
    <div>
      {params.albumId}
    </div>
  )
}

export default AlbumIdPage
