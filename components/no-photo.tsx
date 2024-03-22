import Link from "next/link";

const NoPhoto = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <p className="text-center text-gray-500 text-lg mt-8">No photos found</p>
      <p className="text-center text-gray-500 text-lg mt-2">
        Please{" "}
        <Link href={"/login"} className="underline underline-offset-4">
          login
        </Link>{" "}
        and upload some photos
      </p>
      <p className="text-center text-gray-500 text-lg mt-2">
        and they will appear here.
      </p>
    </div>
  );
};

export default NoPhoto;
