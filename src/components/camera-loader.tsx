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
        <path d="M404.9 339.5v-43.3c0-0.8 0-2.4 0-3.2H107.1c0 0.8 0-2.4 0 3.2v43.3c0 5.5 3.9 9.5 9.5 9.5h279.6c5.5-0.1 9.5-4 9.5-9.5z" fill="#FFFFFF" />

        {/* 左侧红色按钮 */}
        <circle cx="167.8" cy="200.1" r="18.9" fill="#DF2C2C" />
        <path d="M167.8 181.2c-10.2 0-18.9 8.7-18.9 18.9c0 5.5 2.4 9.5 5.5 13.4l26-26c-3.2-4-7.9-6.3-12.6-6.3z" fill="#FA5655" />

        {/* 右上角闪光灯区域 */}
        <g className="flash-group">
          {/* 闪光光晕效果 */}
          <circle cx="344.2" cy="167.8" r="25" className="flash-glow" fill="white" opacity="0" />
          <path d="M367.9 185.9c0 2.4-2.4 4.7-4.7 4.7h-37c-2.4 0-4.7-2.4-4.7-4.7v-37c0-2.4 2.4-4.7 4.7-4.7h37c2.4 0 4.7 2.4 4.7 4.7v37z" fill="#21B2D1" className="flash-area" />
          <circle cx="344.2" cy="167.8" r="18.9" fill="#6FDAF1" className="flash-light" />
        </g>

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
          <rect x="134.7" y="290" width="241.8" height="0" fill="#3E3E3F" className="print-slot" />
          <g className="photo">
            {/* 照片背景 */}
            <rect x="156" y="290" width="200" height="160" rx="4" fill="#FFFFFF" />
            
            {/* 照片内容 - 简单的风景 */}
            <rect x="166" y="300" width="180" height="100" fill="#6FDAF1" /> {/* 天空 */}
            <circle cx="206" cy="330" r="15" fill="#FFD700" /> {/* 太阳 */}
            <path d="M166 400 L196 360 L226 390 L256 350 L286 380 L316 360 L346 400 Z" fill="#4CAF50" /> {/* 山 */}
            
            {/* 照片边框 */}
            <rect x="156" y="290" width="200" height="160" rx="4" fill="none" stroke="#E0E0E0" strokeWidth="2" />
            
            {/* 照片底部白边 */}
            <rect x="156" y="420" width="200" height="30" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
      <style jsx>{`
        .print-animation .print-slot {
          animation: printSlot 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .print-animation .photo {
          animation: printPhoto 6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          transform-origin: top;
          will-change: transform, opacity;
          transform-box: fill-box;
        }
        .flash-area {
          animation: flashArea 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .flash-light {
          animation: flashLight 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .flash-glow {
          animation: flashGlow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes printSlot {
          0%, 15% {
            height: 0;
          }
          25%, 85% {
            height: 8px;
          }
          95%, 100% {
            height: 0;
          }
        }
        @keyframes printPhoto {
          0%, 15% {
            transform: translateY(0) scaleY(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translateY(0) scaleY(0.2) rotate(0deg);
            opacity: 0.8;
          }
          45% {
            transform: translateY(0) scaleY(0.4) rotate(2deg);
            opacity: 0.9;
          }
          65% {
            transform: translateY(0) scaleY(0.7) rotate(5deg);
            opacity: 0.95;
          }
          85% {
            transform: translateY(0) scaleY(0.9) rotate(8deg);
            opacity: 1;
          }
          95%, 100% {
            transform: translateY(0) scaleY(1) rotate(10deg);
            opacity: 1;
          }
        }
        @keyframes flashArea {
          0%, 8% {
            fill: #21B2D1;
          }
          10%, 12% {
            fill: #FFFFFF;
          }
          15%, 100% {
            fill: #21B2D1;
          }
        }
        @keyframes flashLight {
          0%, 8% {
            fill: #6FDAF1;
            filter: none;
          }
          10%, 12% {
            fill: #FFFFFF;
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1));
          }
          15%, 100% {
            fill: #6FDAF1;
            filter: none;
          }
        }
        @keyframes flashGlow {
          0%, 8% {
            opacity: 0;
            transform: scale(1);
          }
          10% {
            opacity: 1;
            transform: scale(1.2);
          }
          12% {
            opacity: 0;
            transform: scale(1.5);
          }
          15%, 100% {
            opacity: 0;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CameraLoader;
