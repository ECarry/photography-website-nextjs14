import { initialUser } from "@/lib/initial-user"
import PageHeader from "../_components/PageHeader";

const page = async () => {
  const user = await initialUser()

  console.log(user);
  
  return (
    <div>
      <div className="">
        <PageHeader
          title="Rent an House in Dubai"
          onClick={() => {}}
        />
      </div>
      
    </div>
  )
}

export default page
