import { initialUser } from "@/lib/initial-user"
import PageHeader from "../_components/PageHeader";
import { useModal } from "@/hooks/use-modal-store";

const page = async () => {
  const user = await initialUser()

  console.log(user);
  
  return (
    <div>
      <div className="">
        <PageHeader
          title="Rent an House in Dubai"
          label='Add Photo'
          icon='Plus'
        />
      </div>
      
    </div>
  )
}

export default page
