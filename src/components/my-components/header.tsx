"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { UserProfile } from "@clerk/nextjs";
import { getFullUser } from "../../../utils/supabse/apis/userApis";

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

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [dbUser, setDbuser] = useState();
  useEffect(() => {
    const getUser = async () => {
      const data = await getFullUser(user?.id);
      if (data) {
        setDbuser(data[0]);
      }
    };
    getUser();
  }, [isSignedIn]);

  console.log("user", dbUser);
  return (
    <nav className="bg-[#131D29] text-white px-4 py-4 md:px-10 md:py-5 flex items-center justify-between border-b border-b-[#8080805c]">
      <Link href={"/"}>
        <div>Logo</div>
      </Link>
      <div className="md:hidden">
        <Menu />
      </div>

      <div className="md:flex gap-5 items-center hidden  ">
        <div className="md:flex items-center gap-10 mr-10 hidden ">
          <div>
            <Link
              className="text-1xl hover:text-red-400 transition-all ease-in-out duration-200 "
              href={`${
                dbUser?.plan === "1" && "6" ? "/lets-talk" : "/pricing"
              }`}
            >
              Start
            </Link>
          </div>

          {Links.map((item, index) => (
            <Link
              key={index}
              className="text-1xl hover:text-red-400 transition-all ease-in-out duration-200 "
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
