import { QueryProvider } from "@/components/providers/QueryClientProvider";
import Sidebar from "./_components/Sidebar";
import FloatingDockMobile from "./_components/floating-dock-mobile";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <QueryProvider>
        <Sidebar />
        {children}
        <FloatingDockMobile />
      </QueryProvider>
    </main>
  );
};

export default HomeLayout;
