const CameraLoader = () => {
  return (
    <div className="relative">
      <svg
        width="80"
        height="92"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 相机主体 */}
        <path d="M386 144.1c0-10.2-8.7-18.9-18.9-18.9H144.1c-10.2 0-18.9 8.7-18.9 18.9V256H386V144.1z" fill="#FFFFFF" />

        {/* 彩色条纹 */}
        <path d="M237.1 229.2V256h14.2v-23.6c-4.8 0-9.5-1.6-14.2-3.2z" fill="#FA5655" />
        <path d="M256 232.4c-1.6 0-3.2 0-4.7 0V256h14.2v-24.4c-3.2 0.8-6.3 0.8-9.5 0.8z" fill="#FACB1B" />
        <path d="M265.5 231.6V256h14.2v-29.1c-4.8 2.3-9.5 3.9-14.2 4.7z" fill="#21B2D1" />

        {/* 相机镜头外圈 */}
        <circle cx="256" cy="181.2" r="51.2" fill="#CFD3D4" />
        <path d="M256 130c-28.4 0-51.2 22.8-51.2 51.2c0 15.8 7.1 29.9 18.1 39.4l10.2-10.2c-8.7-7.1-14.2-17.3-14.2-29.1c0-20.5 16.5-37 37-37c11.8 0 22.8 5.5 29.1 14.2l10.2-10.2C285.9 137.8 271.8 130 256 130z" fill="#CFD3D4" />

        {/* 相纸出口 */}
        <path d="M404.1 290.7L386 256H126l-17.3 34.7c0 0.8-0.8 1.6-0.8 3.2h297.7c-0.8-1.7-1.6-2.5-1.6-3.2z" fill="#E2E4E5" />
        <path d="M404.9 339.5v-43.3c0-0.8 0-2.4 0-3.2H107.1c0 0.8 0 2.4 0 3.2v43.3c0 5.5 3.9 9.5 9.5 9.5h279.6c5.5-0.1 9.5-4 9.5-9.5z" fill="#FFFFFF" />

        {/* 左侧红色按钮 */}
        <circle cx="167.8" cy="200.1" r="18.9" fill="#DF2C2C" />
        <path d="M167.8 181.2c-10.2 0-18.9 8.7-18.9 18.9c0 5.5 2.4 9.5 5.5 13.4l26-26c-3.2-4-7.9-6.3-12.6-6.3z" fill="#FA5655" />

        {/* 右上角闪光灯区域 */}
        <path d="M367.9 185.9c0 2.4-2.4 4.7-4.7 4.7h-37c-2.4 0-4.7-2.4-4.7-4.7v-37c0-2.4 2.4-4.7 4.7-4.7h37c2.4 0 4.7 2.4 4.7 4.7v37z" fill="#21B2D1" />
        <circle cx="344.2" cy="167.8" r="18.9" fill="#6FDAF1" />

        {/* 相机镜头内圈 */}
        <circle cx="256" cy="181.2" r="37" fill="#3E3E3F" />
        <path d="M256 144.1c-20.5 0-37 16.5-37 37c0 11.8 5.5 22.1 14.2 29.1l52-52c-6.9-8.5-17.2-14.1-29.2-14.1z" fill="#5B5C5F" />

        {/* 相纸条纹 */}
        <polygon points="251.3,293 228.4,293 237.1,256 251.3,256" fill="#DF2C2C" />
        <polygon points="288.3,293 265.5,293 265.5,256 279.6,256" fill="#059BBF" />
        <polygon points="270.2,293 246.5,293 251.3,256 265.5,256" fill="#F3B607" />

        {/* 底部控制条 */}
        <path d="M386 321.4c0 5.5-3.9 9.5-9.5 9.5H134.7c-5.5 0-9.5-3.9-9.5-9.5s3.9-9.5 9.5-9.5h241.8c5.5 0 9.5 3.9 9.5 9.5z" fill="#3E3E3F" />

        {/* 打印的相纸 */}
        <g className="print-animation">
          <rect x="134.7" y="321.4" width="241.8" height="0" fill="#3E3E3F" className="print-slot" />
          <g className="photo">
            <path d="M348.9 321.4H256h-92.9c-16.5 13.4-37.8 63-37.8 83.5H256h130c0-20.5-20.5-70.1-37.1-83.5z" fill="#F0F1F1" />
            <path d="M322.2 321.4H256h-66.2c-11.8 7.9-26.8 35.4-26.8 46.5H256h93.7c-0.1-11.1-15.8-38.6-27.5-46.5z" fill="#6FDAF1" />
            <path d="M162.3 367.9c0-11.8 15-39.4 26.8-46.5h-26c-16.5 13.4-37.8 63-37.8 83.5h60.7l37-37h-60.7z" fill="#FFFFFF" />
            <path d="M189.8 321.4c-11.8 7.9-26.8 35.4-26.8 46.5h60.7l46.5-46.5H256h-66.2z" fill="#9CE5F4" />
          </g>
        </g>
      </svg>
      <style jsx>{`
        .print-animation .print-slot {
          animation: printSlot 3s ease-out infinite;
        }
        .print-animation .photo {
          animation: printPhoto 3s ease-out infinite;
        }
        @keyframes printSlot {
          0%, 30% {
            height: 0;
          }
          40% {
            height: 10px;
          }
          60%, 100% {
            height: 0;
          }
        }
        @keyframes printPhoto {
          0%, 30% {
            transform: translateY(321.4px) scaleY(0);
            opacity: 0;
          }
          40% {
            transform: translateY(321.4px) scaleY(0.1);
            opacity: 1;
          }
          60% {
            transform: translateY(321.4px) scaleY(1);
          }
          100% {
            transform: translateY(404.9px) scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CameraLoader;
