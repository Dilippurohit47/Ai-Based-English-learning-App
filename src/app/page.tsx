"use client";
import 'regenerator-runtime/runtime';
import LandingPage from "../app/home/page"
import SecondPage from   "../pages/SecondPage";
import { useEffect } from 'react';
import 'lenis/dist/lenis.css'
import Lenis from 'lenis';
export default function Home() {

  useEffect(() =>{
    const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
return () => {
  lenis.destroy();
};
  },[])

  return <div className=" bg-[#080D27] h-[90.5vh] py-16" >
<LandingPage />
<SecondPage />
  </div>;
}
