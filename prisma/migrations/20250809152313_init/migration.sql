/*
  Warnings:

  - You are about to drop the column `price` on the `lessons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."lesson_usp_include" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."lessons" DROP COLUMN "price";
