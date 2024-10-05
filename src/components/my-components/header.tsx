"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { getFullUser } from "../../../utils/supabse/apis/userApis";
import SideBar from "./sideBar";

interface LinkItem {
  name: string;
  href: string;
}

const Links: LinkItem[] = [
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Docs",
    href: "/docs",
  },
  {
    name: "Coffee",
    href: "/buy-me-coffee",
  },
];
interface User {
  plan: string;
}
const Header = () => {
  const { isSignedIn, user } = useUser();
  const [dbUser, setDbuser] = useState();

  const [hasScrolled, setHasSrolled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await getFullUser(user?.id!);

      if (data && data?.length >= 1) {
        setDbuser(data[0]);
        console.log(data?.length);
      }
    };
    getUser();
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setHasSrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    console.log(hasScrolled);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [sideBar, setSidebar] = useState<boolean>(false);

  return (
    <nav
      className={clsx(
        `  bg-[#080D27]  z-50 fixed top-0 left-0 w-full   max-w-full transition-all ease-in-out duration-300 text-white px-4 py-4 md:px-10 md:py-6 flex items-center justify-between`,
        hasScrolled ? "md:py-3 bg-[#07051d]  " : ""
      )}
    >
      <Link href={"/"}>
        <div>Logo</div>
      </Link>
      <div className="md:hidden" onClick={() => setSidebar(!sideBar)}>
        <Menu />
      </div>

      <div
        className={clsx(
          `absolute bg-red-500 w-full top-0  transition-all ease-in-out duration-300`,
          sideBar ? "right-0 " : "-right-[100%]"
        )}
      >
        <SideBar setSidebar={setSidebar} />
      </div>

      <div className="md:flex gap-5 items-center hidden  ">
        <div className="md:flex items-center gap-10 mr-10 hidden ">
          <div>
            <Link
              className="text-1xl hover:text-[#C8EA80] transition-all ease-in-out duration-200 "
              href={`${dbUser?.plan > 0 ? "/lets-talk" : "/pricing"}`}
            >
              Start
            </Link>
          </div>

          {Links.map((item, index) => (
            <Link
              key={index}
              className="text-1xl hover:text-[#C8EA80] transition-all ease-in-out duration-200 "
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button className="bg-transparent hover:ring-1 text-1xl ring-red-400">
                login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
