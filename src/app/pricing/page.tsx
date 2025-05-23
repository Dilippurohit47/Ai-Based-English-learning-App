"use client";

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

import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { updateUserPlan } from "../actions/prismaActions";
// eslint-disable-next-line
declare global {
  interface Window {
    // eslint-disable-next-line
    Razorpay: any;
  }
}

interface Benefit {
  [key: string]: string;
}
interface PackageTypes {
  name: string;
  price: number;
  duration: number;

  benefits: Benefit[];
}

const PackagePlans: PackageTypes[] = [
  {
    name: "Pro Package",
    price: 5,
    duration: 1,
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
    price: 50,
    duration: 6,
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
    price: 90,
    duration: 12,

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

interface PaymentResponse {
  razorpay_payment_id: string;
}
const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const handlePayment = async (amount: number, duration: number) => {
    if (user) {
      try {
        const response = await fetch(`/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },  
          body: JSON.stringify({ amount }),
        });
        const data = await response.json();
        const options = {
          key: process.env.NEXT_PUBLIC_RAZOR_KEYID,
          amount: amount * 100 * 82,
          currency: "INR",
          description: "TEst0",
          orderId: data.orderId,
          notes:{
            amount:amount * 100 * 82,
            duration:duration,
            dataComingFrom :"Webhook"
          },
          handler: function (response: PaymentResponse) {
            router.push("/lets-talk");

            console.log(response);
            updateUserPlanfunc(duration, user?.id);
          },
          theme: {
            color: "#3399c",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.log("error in payment function", error);
      }
    } else {
      router.push("/sign-in");
    }
  };

  const updateUserPlanfunc = async (plan: number, clerkId: string) => {
    await updateUserPlan(plan, clerkId);
  };

  return (
    <div className=" bg-[#080D27]  lg:h-[91vh] py-5 mt-14  md:mt-20 ">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => console.log("Razorpay script loaded")}
      />
      <h1 className=" text-3xl max-lg:h4 max-md:h5  z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm">
        Flexible pricing for Everyone
      </h1>
      <div className=" flex flex-col md:flex-row mt-8  items-center  gap-8  justify-center ">
        {PackagePlans?.map((item, index) => (
          <Card
            key={index}
            className="px-8   pt-8 pb-6 min-w-[21vw] bg-[#080D27] rounded-3xl  cursor-pointer lg:hover:-translate-y-8 transition-all ease-in-out duration-500 shadow-lg border-[1px]  border-[#006eff71]"
          >
            <CardHeader>
              <CardTitle className="text-center mb-2 text-xl text-white md:mb-4">
                {item.name}
              </CardTitle>
              <CardDescription className="text-center  text-[#C8EA80] text-3xl font-bold">
                ${item.price}
              </CardDescription>
            </CardHeader>
            <CardContent className="md:mt-4 flex flex-col text-white  gap-5">
              {item.benefits.map((bene, index) => (
                <div key={index} className="flex gap-2 items-center">
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
              <CustomButton
                onClick={() => {
                  handlePayment(item.price, item.duration);
                }}
              >
                Try it Now
              </CustomButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
