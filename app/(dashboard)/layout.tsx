import { Suspense } from "react";
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
      <Suspense>
        <QueryProvider>
          <Navbar />
          <main className="pb-20">
            {children}
            <FloatMenu routes={dashboardRoutes} />
            <Toaster />
            <ModalProvider />
          </main>
        </QueryProvider>
      </Suspense>
    </>
  );
};

export default DashboardLayout;
