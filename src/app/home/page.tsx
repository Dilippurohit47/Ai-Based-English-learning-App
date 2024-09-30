import { Button } from "@/components/ui/button";
import TypeWriter from "../../components/my-components/TypeWriter";
import "../globals.css";

import ss from "./s.png";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import CustomButton from "@/components/my-components/CustomButton";

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="  bg-[#080D27]   lg:h-[calc(100vh - 8px)]  flex mt-10 flex-col gap-8 items-center justify-center mb-4">
      <TypeWriter />
      <div className=" md:h-2/4 md:w-2/4  p-4 border-[0.5px] border-[#001aff3c] rounded-3xl  ">
        <Image
          src={ss}
          alt="Image"
          className="md:w-[50vw] md:h-[50vh] object-cover  "
        />
      </div>
      <div className="flex  gap-6 max-md:mt-6">
        <Link href={`${isSignedIn ? "/demo" : "/sign-in?redirect=demo"}`}>
          <CustomButton onClick={() => {}}>Demo</CustomButton>
        </Link>
        <Link href={"/pricing"}>
          <CustomButton onClick={() => {}}>Pricing</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
