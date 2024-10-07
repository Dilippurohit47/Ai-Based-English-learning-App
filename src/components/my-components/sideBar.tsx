"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getFullUser } from "../../../utils/supabse/apis/userApis";
import { Button } from "../ui/button";
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
  id: string;
  plan: string;
}
const SideBar = ({ setSidebar }: { setSidebar: (state: boolean) => void }) => {
  const { isSignedIn, user } = useUser();
  const [dbUser, setDbuser] = useState<User | null>();

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const data = await getFullUser(user?.id);
        if (data && data.length >= 1) {
          setDbuser(data[0]);
        }
      }
    };
    getUser();
  }, [isSignedIn]);
  return (
    <div className="bg-[#080D27] h-[100vh] absolute left-0 top-0 w-full md:hidden">
      <div className="py-4 px-2 text-2xl font-bold flex justify-between">
        English.Ai
        <div onClick={() => setSidebar(false)}>
          <RxCross1 />
        </div>
      </div>
      <div className="flex mt-8  flex-col gap-5  items-center md:hidden  ">
        <div className="flex flex-col px-3 items-start justify-center  w-full gap-6  md:hidden ">
          <div>
            <Link
              onClick={() => setSidebar(false)}
              className="text-2xl text-[#C2C9F3] w-full border-b-1 transition-all font-semibold ease-in-out duration-200 "
              href={`${
                dbUser && Number(dbUser?.plan) > 0 ? "/lets-talk" : "/pricing"
              }`}
            >
              Start
            </Link>
          </div>

          {Links.map((item, index) => (
            <Link
              onClick={() => setSidebar(false)}
              key={index}
              className="text-2xl border-b-1  text-[#C2C9F3]  w-full  transition-all font-semibold ease-in-out duration-200 "
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="px-2 w-full">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href={"/sign-in"}>
              <Button className="bg-transparent  text-2xl font-semibold ring-red-400">
                login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
