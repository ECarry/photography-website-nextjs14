const CameraLoader = () => {
  return (
    <div className="relative">
      <svg
        width="80"
        height="92"
        viewBox="0 0 40 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-800"
      >
        <path
          d="M8 4C8 2.89543 8.89543 2 10 2H30C31.1046 2 32 2.89543 32 4V34C32 35.1046 31.1046 36 30 36H10C8.89543 36 8 35.1046 8 34V4Z"
          className="stroke-current"
          strokeWidth="1.5"
          fill="white"
        />

        <rect x="8" y="6" width="24" height="2" fill="#FF9EAA" />
        <rect x="8" y="8" width="24" height="2" fill="#FFD4A3" />
        <rect x="8" y="10" width="24" height="2" fill="#FDFFB6" />

        <circle
          cx="20"
          cy="19"
          r="6"
          className="stroke-current"
          strokeWidth="1.5"
          fill="white"
        />
        <circle
          cx="20"
          cy="19"
          r="4"
          className="stroke-current"
          strokeWidth="1.5"
          fill="white"
        />

        <circle
          cx="28"
          cy="16"
          r="2"
          fill="#FFD4A3"
          className="animate-pulse"
        />

        <path d="M12 36H28" className="stroke-current" strokeWidth="1.5" />

        <rect
          x="14"
          y="36"
          width="12"
          height="0"
          fill="#F8F9FA"
          stroke="#E9ECEF"
          className="animate-[print_3s_ease-out_infinite]"
        />

        <circle cx="14" cy="16" r="1.5" className="fill-current" />
        <rect x="12" y="28" width="16" height="1" className="fill-current" />
      </svg>
      <style jsx>{`
        @keyframes print {
          0% {
            height: 0;
            y: 36;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            height: 20;
            y: 36;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CameraLoader;
