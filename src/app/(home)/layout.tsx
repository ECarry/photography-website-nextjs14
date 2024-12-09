import Header from "@/app/(home)/_components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="p-3 h-full">{children}</main>
    </>
  );
};

export default HomeLayout;
