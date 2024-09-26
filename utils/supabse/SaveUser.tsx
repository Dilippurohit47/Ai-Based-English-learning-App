import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { supabase } from "./client";

export default function SaveUserInfo() {
    const { user, isSignedIn } = useUser(); // Use Clerk to get user info
    
    useEffect(() => {
      if (isSignedIn && user) {
        // Prepare the data you want to store in Supabase
        const userInfo = {
          id: user.id,                  // Clerk user ID
          email: user.emailAddresses[0].emailAddress, // Clerk email
          fullName: `${user.firstName} ${user.lastName}`, // Full name from Clerk
          credits: 0,                   // Initial credits, or you can update as per your logic
        };
  
        // Insert or update the user info in Supabase
        const saveUser = async () => {
          const { data, error } = await supabase
            .from("users")               // Your Supabase users table
            .upsert(userInfo, { onConflict: ['id'] }); // Upsert will insert or update the user based on 'id'
  
          if (error) {
            console.error("Error saving user to Supabase:", error);
          } else {
            console.log("User saved successfully:", data);
          }
        };
  
        // Call the saveUser function
        saveUser();
      }
    }, [isSignedIn, user]); // Re-run the effect when the user signs in or changes
  
    return <div>Saving User Info...</div>;
  }