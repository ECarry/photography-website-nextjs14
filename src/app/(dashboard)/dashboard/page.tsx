import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <div>DashboardPage</div>;
};

export default DashboardPage;
