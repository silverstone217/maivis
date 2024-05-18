/*
  Warnings:

  - You are about to drop the column `resavationDate` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `reservationDate` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "resavationDate";
ALTER TABLE "Booking" ADD COLUMN     "reservationDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" STRING NOT NULL,
    "rate" INT4 NOT NULL DEFAULT 3,
    "raterId" STRING NOT NULL,
    "ratedId" STRING NOT NULL,
    "bookingId" STRING NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
