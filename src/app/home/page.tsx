import { Button } from "@/components/ui/button";
import TypeWriter from "../../components/my-components/TypeWriter";
import "../globals.css";

import ss from "./s.png";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className=" bg-[#131D29] flex flex-col gap-8 items-center justify-center">
      <TypeWriter />
      <div className=" h-2/4 w-2/4  p-4 border rounded-3xl  border-[#80808098] ">
        <Image
          src={ss}
          alt="Image"
          className="w-[50vw] h-[50vh] object-cover  "
        />
      </div>
      <div className="flex gap-6">
        <Link href={`${isSignedIn ? "/demo" : "/sign-in?redirect=demo"}`}>
          <Button className="bg-green-500 hover:scale-110 transition-all ease-in-out duration-300">
            Demo
          </Button>
        </Link>
        <Link href={"/pricing"}>
          <Button className="bg-blue-500  hover:scale-110 transition-all ease-in-out duration-300">
            Pricing
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
