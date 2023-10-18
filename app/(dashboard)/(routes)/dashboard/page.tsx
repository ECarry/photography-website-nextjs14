import type { Metadata } from 'next'
import { initialUser } from "@/lib/initial-user"
import PageHeader from "../../_components/PageHeader";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: 'Dashboard - ECarry Photography',
  description: 'Dashboard',
}

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
      
      <div className="mt-6 pb-6">
        <PhotoGallery />
      </div>
    </div>
  )
}

export default page
