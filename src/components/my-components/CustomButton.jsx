import React from "react";

const CustomButton = ({ children }) => {
  const Inner = () => (
    <>
      <span className="relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100  overflow-hidden">
      <span className="relative z-2 font-poppins base-bold text-p1 uppercase text-[16px] font-bold leading-[24px]  ">
          {children}
        </span>
      </span>
      <span className="glow-before glow-after" />

    </>
  );

  return (
    <button className="relative p-0.5 g5 rounded-2xl shadow-500 group">
      <Inner />
    </button>
  );
};

export default CustomButton;
