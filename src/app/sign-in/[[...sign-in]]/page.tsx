"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SaveUserInfo from "../../../../utils/supabse/SaveUser";

export default function Page() {
  const searchparams = useSearchParams();
  const redirectUrl = searchparams.get("redirect"); 
const  {isSignedIn}  = useUser()

  useEffect(() =>{
console.log("sigin")
    if(isSignedIn){
      SaveUserInfo()
console.log(" after sigin")

    }

  },[isSignedIn])

  return (
    <div className="flex h-screen justify-center items-center">
 <SignIn  fallbackRedirectUrl={`${redirectUrl ? `/${redirectUrl}` : "/"}`} signUpFallbackRedirectUrl="/" />
    </div>
  );
}
