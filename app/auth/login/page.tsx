import SignInForm from "./login-form";

export const metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <main className="w-full h-dvh p-1">
      <div className="w-full h-full relative overflow-hidden grid lg:grid-cols-12 p-4">
        <div
          style={{
            backgroundImage: `url('/bg.jpg')`,
            backgroundPosition: "center",
          }}
          className="hidden lg:block lg:col-span-7 2xl:col-span-8 rounded-xl"
        ></div>
        <div className="lg:col-span-5 2xl:col-span-4 rounded-[10px] bg-white flex items-start lg:items-center justify-center">
          <SignInForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
