import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/providers/modal-provider";
import FloatMenu from "./_components/float-menu";
import { QueryProvider } from "@/providers/QueryClientProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
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
