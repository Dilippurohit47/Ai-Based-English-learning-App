"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchparams = useSearchParams();
  const redirectUrl = searchparams.get("redirect"); // Get the redirect URL
  const { isSignedIn } = useUser(); // Get signed-in status
  const router = useRouter(); // Router instance

  // Redirect the user if already signed in
  useEffect(() => {
    if (isSignedIn) {
      console.log("User is already signed in, redirecting...");
      if (redirectUrl) {
        router.push(`/${redirectUrl}`);
      } else {
        router.push("/"); // Default fallback
      }
    }
  }, [isSignedIn, redirectUrl, router]);

  return (
    <div className="flex h-screen justify-center items-center">
 <SignIn fallbackRedirectUrl={`${redirectUrl ? `/${redirectUrl}` : "/"}`} signUpFallbackRedirectUrl="/" />
    </div>
  );
}
