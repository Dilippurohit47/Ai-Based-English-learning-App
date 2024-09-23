import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Header from "@/components/my-components/header";


interface Benefit {
  [key: string]: string;
}
interface PackageTypes {
  name: string;
  price: number;
  benefits: Benefit[];
}

const PackagePlans: PackageTypes[] = [
  {
    name: "Pro Package",
    price: 20,
    benefits: [
      {
        name: "One Month",
        available: "Yes",
      },
      {
        name: "Unlimited Talks",
        available: "NO",
      },
      {
        name: "Support Centre",
        available: "NO",
      },
    ],
  },
  {
    name: "Pro Package",
    price: 100,
    benefits: [
      {
        name: "Six Months",
        available: "Yes",
      },
      {
        name: "Unlimited Talks",
        available: "Yes",
      },
      {
        name: "Support Centre",
        available: "Yes",
      },
    ],
  },
  {
    name: "Rich Package",
    price: 200,
    benefits: [
      {
        name: "One Year",
        available: "Yes",
      },
      {
        name: "Unlimited Talks",
        available: "Yes",
      },
      {
        name: "Support Centre",
        available: "Yes",
      },
    ],
  },
];

const Page = () => {
  return (
    <>
<Header/>
    <div className="py-20 ">
      <h1 className="text-center  text-4xl font-semibold">Buy Package</h1>
      <p className="text-center text-[1.5rem] text-gray-500 mt-2 mb-4">Choose a pack that suits your need</p>
    <div className="flex h-full   items-center  gap-8  justify-center ">

      {PackagePlans?.map((item, index) => (
        <Card className="px-10 py-8  shadow-lg ">
          <CardHeader>
            <CardTitle className="text-center text-gray-600 mb-4">
              {item.name}
            </CardTitle>
            <CardDescription className="text-center  text-black text-3xl font-bold">
              ${item.price}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 flex flex-col gap-5">
            {item.benefits.map((bene, index) => (
              <div className="flex gap-2 items-center">
                {bene.available === "Yes" ? (
                  <p className="bg-gray-300 rounded-full p-1 text-blue-500">
                    <IoMdCheckmark />
                  </p>
                ) : (
                  <p className="bg-gray-300 rounded-full p-1 text-red-500">
                    <RxCross1 />
                  </p>
                )}

                <p className="text-[1.2rem] font[400]"> {bene.name}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="rounded-full mt-5 bg-blue-500 w-full ">
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    </div>
    </>

  );
};

export default Page;
