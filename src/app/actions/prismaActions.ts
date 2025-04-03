"use server";
import { prisma } from "@/lib/prisma";

/** 🟢 Deduct credits from the user */
export const deductCredits = async (clerkId: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { clerkUserId: clerkId },
      select: { credits: true },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.credits <= 0) {
      return { success: false, message: "Insufficient credits" };
    }

    const updatedUser = await prisma.users.update({
      where: { clerkUserId: clerkId },
      data: { credits: user.credits - 1 },
    });

    return { success: true, message: "Credits deducted", data: updatedUser };
  } catch (error) {
    console.error("Error deducting credits:", error);
    return { success: false, message: "Internal server error" };
  }
};

/** 🟢 Expire the user's plan */
export const planExpired = async (clerkId: string) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { clerkUserId: clerkId },
      data: { plan: 0 },
    });

    return { success: true, message: "Plan expired", data: updatedUser };
  } catch (error) {
    console.error("Error expiring plan:", error);
    return { success: false, message: "Internal server error" };
  }
};

/** 🟢 Get user credits and plan details */
export const getUser = async (clerkId: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { clerkUserId: clerkId },
      select: {
        credits: true,
        plan: true,
        plan_expired_date: true,
        plan_has: true,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, message: "Internal server error", error };
  }
};

/** 🟢 Get full user details */
export const getFullUser = async (clerkId: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: { clerkUserId: clerkId },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching full user:", error);
    return { success: false, message: "Internal server error" };
  }
};

/** 🟢 Update user plan */
export const updateUserPlan = async (plan: number, clerkId: string) => {
  try {
    console.log("Updating plan for:", plan, clerkId);

    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + plan);
    const expiredDate = expirationDate.toISOString().split("T")[0]; // YYYY-MM-DD

    console.log("Plan start:", formattedDate, "Plan expire:", expiredDate);

    const updatedUser = await prisma.users.update({
      where: { clerkUserId: clerkId },
      data: {
        plan,
        plan_has: true,
        plan_started_date: new Date(),
        plan_expired_date: new Date(new Date().setMonth(new Date().getMonth() + plan)) 
      },
    });

    return { success: true, message: "Plan updated", data: updatedUser };
  } catch (error) {
    console.error("Error updating user plan:", error);
    return { success: false, message: "Internal server error" };
  }
};
