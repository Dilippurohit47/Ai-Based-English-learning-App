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

export const planExpired = async (clerkId: string) => {
  const { data, error } = await supabase
    .from("users")
    .update({ plan: 0 })
    .eq("clerk_id", clerkId);

  if (error) {
    return error;
  }

  return data;
};

export const getUser = async (clerkId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("credits , plan ,plan_expired_date ,plan_has")
    .eq("clerk_id", clerkId);

  return data;
};
export const getFullUser = async (clerkId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("clerk_id", clerkId);

  return data;
};

  export const updateUserPlan = async (plan: number, clerkId: string) => {


    console.log(plan,clerkId)

      const date = new Date(Date.now());
      const formattedDate = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;


      const expirationDate = new Date(date);
      expirationDate.setMonth(expirationDate.getMonth() + plan);

      const expiredDate = `${expirationDate.getFullYear()}-${(
          "0" + (expirationDate.getMonth() + 1)
      ).slice(-2)}-${("0" + expirationDate.getDate()).slice(-2)}`;


      console.log(formattedDate, expiredDate); 


    const { data, error } = await supabase
      .from("users")
      .update({
        plan: plan,
        plan_has: true,
        plan_started_date: formattedDate,
        plan_expired_date: expiredDate,
      })
      .eq("clerk_id", clerkId);

    if (error) {
      console.log(error)
      return error;
    }

    return data;
  };