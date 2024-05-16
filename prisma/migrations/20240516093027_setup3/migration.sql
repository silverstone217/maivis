/*
  Warnings:

  - Made the column `salary` on table `Jobber` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Jobber` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job` on table `Jobber` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Jobber" ALTER COLUMN "salary" SET NOT NULL;
ALTER TABLE "Jobber" ALTER COLUMN "address" SET NOT NULL;
ALTER TABLE "Jobber" ALTER COLUMN "job" SET NOT NULL;
ALTER TABLE "Jobber" ALTER COLUMN "paimentOption" SET DEFAULT 'mobile';
