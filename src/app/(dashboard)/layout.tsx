import ModalProvider from "@/components/providers/modal-provider";
import Navbar from "./_components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard",
    default: "Dashboard",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
        <ModalProvider />
      </main>
    </div>
  );
};

export default DashboardLayout;
