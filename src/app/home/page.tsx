import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";
import "../globals.css";
const LandingPage = () => {
  const typewriterContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typewriterContainerRef.current) {
      const typewriter = new Typewriter(typewriterContainerRef.current, {
        autoStart: true,
        delay: 75,
        loop: true,
      });
      typewriter
        .typeString(
          "Want someone to talk with you in <span style='color: #3B82F6;'>English</span>."
        )
        .pauseFor(1500)
        .deleteAll()
        .typeString("Don't <span style='color: red;'>worry</span>, we are here to help!")
        .pauseFor(1500)
        .start();
    }
  }, []);

  return (
    <div className="h-screen bg-[#131D29] flex flex-col gap-5 items-center justify-center">
      <div className="flex items-start w-[50vw] flex-col gap-3 ">
        <p
          className="text-white  font-bold text-3xl  capitalize"
          ref={typewriterContainerRef}
          dangerouslySetInnerHTML={{ __html: "" }}
        ></p>
        <p className="text-[#ffffff] font-bold text-center ">
          Practice Daily 1-2 hour to improve your English by{" "}
          <span className="text-[#34e634]">75%</span> /  We offer speech recognition
        </p>
      </div>
      <div className="bg-red-500 h-2/4 w-2/4"></div>
      <div className="flex gap-6">
        <Button className="bg-green-500 hover:scale-110 transition-all ease-in-out duration-300">Demo</Button>
        <Button className="bg-blue-500  hover:scale-110 transition-all ease-in-out duration-300">Pricing</Button>
      </div>
    </div>
  );
};

export default LandingPage;
