import { initialUser } from "@/lib/initial-user"
import PageHeader from "../../_components/PageHeader";
import PhotoGallery from "@/components/PhotoGallery";
import ConfettiCannon from "@/components/ConfettiCannon";

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
        <ConfettiCannon />
      </div>
      
      <div className="mt-6 pb-6">
        <PhotoGallery />
      </div>
    </div>
  )
}

export default page
