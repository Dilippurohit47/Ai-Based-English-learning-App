import React, { useEffect, useRef } from "react";
import Coin from "../pages/coin.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const SecondPage = () => {
  const boxRef1 = useRef(null);
  const boxRef2 = useRef(null);
  const boxRef3 = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      [boxRef1.current, boxRef2.current, boxRef3.current],
      {
        y: 100,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef1.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  
  return (
    <div className="h-[60vh] bg-[#131D29] flex justify-center items-center">
      <div className="flex gap-6 ">
        <div
          ref={boxRef1}
          className="bg-slate-100 px-8   text-3xl shadow-md  font-semibold capitalize rounded-2xl w-[20vw] glow-effect inner-shadow py-10"
        >
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

        <div
          ref={boxRef2}
          className="bg-white px-8 text-3xl  font-semibold capitalize rounded-2xl  w-[20vw] py-10 glow-effect inner-shadow"
        >
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
        <div
          ref={boxRef3}
          className="bg-white px-8 text-3xl font-semibold  rounded-2xl  w-[20vw] py-7 glow-effect inner-shadow"
        >
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
