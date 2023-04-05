/*
  Warnings:

  - Added the required column `times` to the `Exercise_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise_log" ADD COLUMN     "times" INTEGER NOT NULL;
