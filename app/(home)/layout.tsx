import Sidebar from "./_components/Sidebar";
import { FloatingDock } from "@/components/floating-dock";
import { QueryProvider } from "@/providers/QueryClientProvider";
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
