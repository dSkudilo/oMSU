/*
  Warnings:

  - You are about to drop the column `created_at` on the `lesson_subjects` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `lesson_subjects` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `lesson_tariffs` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `lesson_tariffs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."lesson_subjects" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "public"."lesson_tariffs" DROP COLUMN "created_at",
DROP COLUMN "updated_at";
