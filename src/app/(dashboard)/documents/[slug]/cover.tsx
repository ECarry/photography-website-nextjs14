import Image from "next/image";

interface Props {
  cover: string;
}

const Cover = ({ cover }: Props) => {
  if (!cover)
    return (
      <div>
        <Image
          src="/placeholder.png"
          alt="Cover"
          width={1000}
          height={1000}
          className="object-cover w-full h-[40vh]"
        />
      </div>
    );

  return (
    <div>
      <Image
        src={cover}
        alt="Cover"
        width={1000}
        height={1000}
        className="object-cover w-full h-[40vh]"
      />
    </div>
  );
};

export default Cover;
