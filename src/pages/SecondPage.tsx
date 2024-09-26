import React from "react";
import Coin from "../pages/coin.png";
import Image from "next/image";
const SecondPage = () => {
  return (
    <div className="h-[50vh] bg-[#131D29] flex justify-center items-center">
      <div className="flex gap-6 ">
        <div className="bg-slate-100 px-8   text-3xl shadow-md  font-semibold capitalize rounded-2xl w-[20vw] glow-effect inner-shadow py-10">
          Login to get 20 credits Free{" "}
          <div className="flex items-center justify-center ">
            <Image
              src={Coin}
              alt="Image"
              className=" shadow-2xl "
              width={40}
              height={40}
            />
          </div>
        </div>

        <div className="bg-white px-8 text-3xl  font-semibold capitalize rounded-2xl  w-[20vw] py-10 glow-effect inner-shadow">
          come daily to get 15 credits
          <div className="flex items-center justify-center ">
            <Image
              src={Coin}
              alt="Image"
              className=" shadow-2xl "
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="bg-white px-8 text-3xl font-semibold  rounded-2xl  w-[20vw] py-7 glow-effect inner-shadow">
          Reffer and make them login to get 50+ credits
          <div className="flex items-center justify-center ">
            <Image
              src={Coin}
              alt="Image"
              className=" shadow-2xl "
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
