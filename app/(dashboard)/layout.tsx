import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/modal-provider";
import FloatMenu from "./_components/float-menu";
import { QueryProvider } from "@/providers/QueryClientProvider";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";

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
        <main className="pb-20">
          {children}
          <FloatMenu />
          <Toaster />
          <ModalProvider />
        </main>
      </QueryProvider>
    </>
  );
};

export default DashboardLayout;
