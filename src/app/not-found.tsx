import VectorCombined from "@/components/vector-combined";

export default function NotFound() {
  return (
    <div className="h-dvh w-full p-3 relative">
      <div className="bg-[url(/404.webp)] bg-bottom bg-cover h-full rounded-lg brightness-75 grayscale"></div>

      <div className="absolute top-3 left-3">
        <VectorCombined title="Back to Homepage" position="top-left" link="/" />
      </div>

      <div className="absolute bottom-3 right-3">
        <VectorCombined title="404 - Page Not Found" position="bottom-right" />
      </div>
    </div>
  );
}
