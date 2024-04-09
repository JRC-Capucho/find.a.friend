/*
  Warnings:

  - Added the required column `color` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "color" TEXT NOT NULL;
