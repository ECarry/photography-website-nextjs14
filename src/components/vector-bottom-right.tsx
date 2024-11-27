import Graphic from "./graphic";

interface Props {
  title: string;
}

const VectorBottomRight = ({ title }: Props) => {
  return (
    <div className="relative bg-background rounded-tl-[18px]">
      <div className="pt-3 px-4 pb-2">
        <p className="text-sm font-light">{title}</p>
      </div>

      <div className="absolute -left-[18px] bottom-0 size-[18px] rotate-180">
        <Graphic />
      </div>

      <div className="absolute -top-[18px] right-0 size-[18px] rotate-180">
        <Graphic />
      </div>
    </div>
  );
};

export default VectorBottomRight;
