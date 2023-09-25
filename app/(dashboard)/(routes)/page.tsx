import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default page
