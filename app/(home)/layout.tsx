import { QueryProvider } from "@/providers/QueryClientProvider";
import Sidebar from "./_components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <main>
        <Sidebar />
        {children}
      </main>
    </QueryProvider>
  );
};

export default HomeLayout;
