"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchparams = useSearchParams();
  const redirectUrl = searchparams!.get("redirect");

  return (
    <div className="flex h-screen justify-center items-center bg-[#080D27]">
      <SignIn
        fallbackRedirectUrl={`${redirectUrl ? `/${redirectUrl}` : "/"}`}
        signUpFallbackRedirectUrl="/"
      />
    </div>
  );
}
