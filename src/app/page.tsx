"use client";
import { useUser } from "@clerk/nextjs";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import "regenerator-runtime/runtime";
import { toast } from "sonner";
import { getUser, planExpired } from "../../utils/supabse/apis/userApis";
import Docs from "../app/docs/page";
import LandingPage from "../app/home/page";
import SecondPage from "../pages/SecondPage";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  const { user } = useUser();
  useEffect(() => {
    const fetchUserPlan = async () => {
      const date = new Date(Date.now());
      const formattedDate = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

      if (user) {
        const userData = await getUser(user.id);
        if (userData) {
          if (
            userData[0]?.plan_has &&
            userData[0]?.plan_expired_date == formattedDate
          ) {
            await planExpired(user.id);
            toast.error(`Your monthly plan was expired on ${formattedDate}`);
          }
        }
      }
    };
    fetchUserPlan();
  }, [user]);

  return (
    <div className=" bg-[#080D27]  py-16">
      <LandingPage />
      <SecondPage />
      <div className="lg:ml-36 mt-14 ">
        <div className="text-[#C2C9F3]   text-[3rem]   md:text-[4rem] text-center -mb-10 md:mr-60">
          Docs
        </div>
        <Docs />
      </div>
    </div>
  );
}
