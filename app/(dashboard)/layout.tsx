import ModalProvider from "@/components/providers/modal-provider";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";
import FloatingDockMobile from "./_components/floating-dock-mobile";
import { QueryProvider } from "@/components/providers/QueryClientProvider";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Dashboard",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryProvider>
        <Navbar />
        <main>
          {children}
          <FloatingDockMobile />
          <ModalProvider />
        </main>
      </QueryProvider>
    </div>
  );
};

export default DashboardLayout;
