import VectorBottomRight from "@/components/vector-bottom-right";
import VectorTopLeft from "@/components/vector-top-left";

export default function NotFound() {
  return (
    <div className="h-dvh w-full p-3 relative">
      <div className="bg-[url(/404.webp)] bg-bottom bg-cover h-full rounded-lg brightness-75 grayscale"></div>

      <div className="absolute top-3 left-3">
        <VectorTopLeft title="Back to Homepage" />
      </div>

      <div className="absolute bottom-3 right-3">
        <VectorBottomRight title="404 - Page Not Found" />
      </div>
    </div>
  );
}
