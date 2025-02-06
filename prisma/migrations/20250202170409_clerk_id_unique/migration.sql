/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_clerkUserId_key" ON "Users"("clerkUserId");
