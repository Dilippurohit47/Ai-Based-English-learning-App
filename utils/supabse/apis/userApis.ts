import { supabase } from "../client";

export const deductCredits = async (clerkId: string) => {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("credits")
    .eq("clerk_id", clerkId)
    .single();

  if (userError) {
    return userError;
  }

  const newCredits = userData.credits - 1;
  const { data, error } = await supabase
    .from("users")
    .update({ credits: newCredits })
    .eq("clerk_id", clerkId);
  if (error) {
    return error;
  }
  return {
    data: {
      message: "credits deducted",
      data: userData,

    },
  };
};
