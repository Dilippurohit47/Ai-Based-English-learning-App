"use client";
import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";

const TypeWriter = () => {
  const typewriterContainerRef = useRef();

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
        .typeString(
          "Dont <span style='color: red;'>worry</span>, we are here to help!"
        )
        .pauseFor(1500)
        .start();
    }
  }, []);

  return (
    <div className="flex  max-md:px-5 items-start md:w-[50vw] flex-col gap-3">
      <p
        className="text-white font-bold   max-md:h-[5vh] text-2xl    md:text-3xl capitalize"
        ref={typewriterContainerRef}
      />
      <p className="text-[#C2C9F3] text-1xl md:text-3xl max-md:mt-10  font-bold text-center">
        Practice Daily 1-2 hours to improve your English by{" "}
        <span className="text-[#34e634]">75%</span> in 1 week. We offer speech
        recognition.
      </p>
    </div>
  );
};

export default TypeWriter;
