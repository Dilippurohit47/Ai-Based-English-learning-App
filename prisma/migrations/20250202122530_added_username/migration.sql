/*
  Warnings:

  - Added the required column `userName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userName" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;
