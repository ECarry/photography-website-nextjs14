import React from "react";

const PostCard = () => {
  return (
    <div className="group w-full h-[600px] relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-neutral-200" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 group-hover:to-black/20 transition-all duration-300" />
      <div className="absolute w-full bottom-0 p-3">
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg flex items-center justify-between">
          <h2 className="text-lg text-neutral-900">Title</h2>
          <span className="text-sm">Read</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
