/*
  Warnings:

  - Added the required column `bonusAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDiscountAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTerm` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentTerm" AS ENUM ('DAYS_7', 'DAYS_30', 'DAYS_45', 'DAYS_60');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bonusAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "netTotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "paymentDiscountAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "paymentTerm" "PaymentTerm" NOT NULL,
ADD COLUMN     "vatAmount" DECIMAL(10,2) NOT NULL;
