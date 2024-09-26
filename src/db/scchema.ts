import  { pgTable, varchar, uuid, integer, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),  // UUID for user ID in Supabase
    clerkUserId: varchar("clerkUserId").notNull().unique(), // Clerk's unique user ID
    email: varchar("email").notNull().unique(),   // Email of the user (from Clerk)
    fullName: varchar("fullName"),                // Full name of the user (from Clerk)
    credits: integer("credits").default(0),       // User's credits, defaulting to 0
    createdAt: timestamp("createdAt").defaultNow(), // Timestamp of account creation
    updatedAt: timestamp("updatedAt").defaultNow(), // Timestamp of the last update
  });
  