import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/modal-provider";
import FloatMenu from "@/components/float-menu";
import { QueryProvider } from "@/providers/QueryClientProvider";
import Navbar from "./_components/Navbar";
import { Metadata } from "next";
import { dashboardRoutes } from "@/components/routes";

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
          <FloatMenu routes={dashboardRoutes} />
          <Toaster />
          <ModalProvider />
        </main>
      </QueryProvider>
    </>
  );
};

export default DashboardLayout;
