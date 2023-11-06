import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "../_components/profile-form";
import { currentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function SettingsProfilePage() {
  const user = await currentUser()

  if(!user) {
    return redirect('/sign-in')
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  )
}
