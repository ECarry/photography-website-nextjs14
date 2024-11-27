import { auth } from "@/auth";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return <SignInCard />;
};

export default SignInPage;
