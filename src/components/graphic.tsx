interface Props {
  className?: string;
}

const Graphic = ({ className }: Props) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          className="fill-background"
          d="M0 0v18C0 8.059 8.059 0 18 0Z"
        ></path>
      </svg>
    </div>
  );
};

export default Graphic;
