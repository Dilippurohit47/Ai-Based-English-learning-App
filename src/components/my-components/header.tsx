import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface LinkItem {
    name: string;
    href: string;
  }

const Links:LinkItem[] = [
  {
    name: "Home",
    href: "/",
  },
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
  return (
    <div className="bg-[#131D29] text-white px-4 py-4 md:px-10 md:py-5 flex items-center justify-between">
      <div>Logo</div>

      <div className="md:hidden">
        <Menu />
      </div>

      <div className="md:flex gap-5 items-center hidden  ">
        <div className="md:flex items-center gap-10 mr-10 hidden ">
          {Links.map((item, index) => (
            <Link key={index}
              className="text-1xl hover:text-red-400 transition-all ease-in-out duration-200 "
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <Link href={"/login"}>
            <Button className="bg-transparent hover:ring-1 text-1xl ring-red-400">
              login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
