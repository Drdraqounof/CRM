/*
  Warnings:

  - The `lastDonation` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "lastDonation",
ADD COLUMN     "lastDonation" TIMESTAMP(3);
