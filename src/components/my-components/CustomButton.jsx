
import React from "react";
import {Marker} from "./Marker"
const CustomButton = ({ children ,onClick}) => {
  const Inner = () => (
    <>
      <span className="relative py-2 min-w-[8vw]  justify-center flex items-center min-h-[60px] px-4 g4 rounded-xl inner-before group-hover:before:opacity-100  overflow-hidden">

      <span className="absolute -left-[1px]">
          <Marker/>
        </span>

      <span className="relative z-2 font-poppins base-bold text-p1 uppercase text-[18px] font-bold leading-[24px]  ">
          {children}
        </span>
      </span>
      <span className="glow-before glow-after" />

    </>
  );

  return (
    <button className="relative p-0.5 g5 rounded-2xl shadow-500 group" onClick={onClick}>
      <Inner />
    </button>
  );
};

export default CustomButton;
