import { initialUser } from "@/lib/initial-user"
import PageHeader from "../../_components/PageHeader";
import PhotoGallery from "@/components/PhotoGallery";

const page = async () => {
  const user = await initialUser()

  return (
    <div>
      <div className="">
        <PageHeader
          title="All Photos"
          label='Add Photo'
          icon='Plus'
        />
      </div>
      
      <div className="mt-6">
        <PhotoGallery />
      </div>
    </div>
  )
}

export default page
