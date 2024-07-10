import { QueryProvider } from "@/providers/QueryClientProvider";
import Sidebar from "./_components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <QueryProvider>
        <Sidebar />
        {children}
      </QueryProvider>
    </main>
  );
};

export default HomeLayout;
