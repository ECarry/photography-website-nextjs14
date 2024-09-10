import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/providers/QueryClientProvider";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";
import FloatingDockMobile from "./_components/floating-dock-mobile";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Dashboard",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <Navbar />
        <main>
          {children}
          <FloatingDockMobile />
          <Toaster />
          <ModalProvider />
        </main>
      </QueryProvider>
    </>
  );
};

export default DashboardLayout;
