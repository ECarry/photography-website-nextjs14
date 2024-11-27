import { UploadPhoto } from "@/features/photos/components/upload-photo";

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Test Photo Upload</h1>
      <div className="max-w-md mx-auto">
        <UploadPhoto />
      </div>
    </div>
  );
}
