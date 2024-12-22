import VectorBottomRight from "@/components/vector-bottom-right";
import VectorTopLeft from "@/components/vector-top-left";
import Footer from "../(home)/_components/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="h-[70vh] lg:h-screen w-full lg:w-1/2 p-3 relative">
        <div className="bg-[url(/bg.webp)] bg-top bg-cover h-full rounded-lg brightness-50"></div>

        <div className="absolute top-3 left-3">
          <VectorTopLeft title="Back to Homepage" />
        </div>

        <div className="absolute bottom-3 right-3">
          <VectorBottomRight title="Sign in" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-3 lg:pl-0 space-y-3 flex flex-col">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
