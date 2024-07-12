import Sidebar from "./_components/Sidebar";
import FloatMenu from "@/components/float-menu";
import { homeRoutes } from "@/components/routes";
import { QueryProvider } from "@/providers/QueryClientProvider";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <QueryProvider>
        <Sidebar />
        {children}
        <FloatMenu routes={homeRoutes} />
      </QueryProvider>
    </main>
  );
};

export default HomeLayout;
