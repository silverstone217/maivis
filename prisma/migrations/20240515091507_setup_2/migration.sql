/*
  Warnings:

  - You are about to drop the column `tel` on the `Jobber` table. All the data in the column will be lost.
  - Added the required column `tel` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobber" DROP COLUMN "tel";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tel" STRING NOT NULL;
