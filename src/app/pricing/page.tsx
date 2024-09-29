import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import CustomButton from "../../components/my-components/CustomButton";
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
    name: "Premium Package",
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
    <div className=" bg-[#0A1B3E] h-[91vh] py-10 overflow-hidden mt-20 ">
      <h1 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
        Flexible pricing for Everyone
      </h1>
      <div className=" flex flex-col md:flex-row mt-8  items-center  gap-8  justify-center ">
        {PackagePlans?.map((item, index) => (
          <Card
            key={index}
            className="px-8 pt-8 pb-6 w-[21vw] bg-[#080D27] rounded-3xl  cursor-pointer hover:scale-105 transition-all ease-in-out duration-500 shadow-lg border-[1px]  border-[#006eff71]"
          >
            <CardHeader>
              <CardTitle className="text-center  text-white mb-4">
                {item.name}
              </CardTitle>
              <CardDescription className="text-center  text-[#C8EA80] text-3xl font-bold">
                ${item.price}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 flex flex-col text-white  gap-5">
              {item.benefits.map((bene, index) => (
                <div className="flex gap-2 items-center">
                  {bene.available === "Yes" ? (
                      <p className="bg-gray-300 rounded-full  p-1 text-blue-500">
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
            <CardFooter className="mt-4">
              <CustomButton>Try it Now</CustomButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
