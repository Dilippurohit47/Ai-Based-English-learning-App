"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchparams = useSearchParams();
  const redirectUrl = searchparams.get("redirect"); 


  return (
    <div className="flex h-screen justify-center items-center">
 <SignIn  fallbackRedirectUrl={`${redirectUrl ? `/${redirectUrl}` : "/"}`} signUpFallbackRedirectUrl="/" />
    </div>
  );
}
