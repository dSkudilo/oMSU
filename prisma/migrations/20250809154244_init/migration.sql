/*
  Warnings:

  - You are about to drop the column `lesson_ups_include_id` on the `lesson_ups_tariff_price` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_id` on the `lesson_usp_include` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" DROP CONSTRAINT "lesson_ups_tariff_price_lesson_ups_include_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_usp_include" DROP CONSTRAINT "lesson_usp_include_lesson_id_fkey";

-- AlterTable
ALTER TABLE "public"."lesson_ups_tariff_price" DROP COLUMN "lesson_ups_include_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lesson_packege_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."lesson_usp_include" DROP COLUMN "lesson_id";

-- CreateTable
CREATE TABLE "public"."lesson_packege" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_packege_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_packege_id_fkey" FOREIGN KEY ("lesson_packege_id") REFERENCES "public"."lesson_packege"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_packege" ADD CONSTRAINT "lesson_packege_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
