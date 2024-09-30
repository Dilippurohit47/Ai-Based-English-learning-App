"use client";
import "regenerator-runtime/runtime";
import LandingPage from "../app/home/page";
import SecondPage from "../pages/SecondPage";
import { useEffect } from "react";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import Docs from "../app/docs/page";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className=" bg-[#080D27]   py-16">
      <LandingPage />
      <SecondPage />
      <div className="ml-36">
        <div className="text-[#C2C9F3] text-[4rem] text-center -mb-10 mr-60">Docs</div>
        <Docs />
      </div>
    </div>
  );
}
