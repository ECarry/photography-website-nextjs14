import Sidebar from "./_components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
};

export default HomeLayout;
