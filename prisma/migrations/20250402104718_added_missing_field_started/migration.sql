/*
  Warnings:

  - The `plan` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "plan_started_date" TIMESTAMP(3),
DROP COLUMN "plan",
ADD COLUMN     "plan" INTEGER;
