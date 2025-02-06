-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "plan" TEXT,
ADD COLUMN     "plan_expired_date" TIMESTAMP(3),
ADD COLUMN     "plan_has" BOOLEAN;
