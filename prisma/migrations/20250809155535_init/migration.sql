/*
  Warnings:

  - You are about to drop the column `lessonTariffId` on the `lesson_ups_tariff_price` table. All the data in the column will be lost.
  - You are about to drop the column `ups_id` on the `lesson_usp_include` table. All the data in the column will be lost.
  - You are about to drop the `lesson_packege` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lesson_tariffId` to the `lesson_ups_tariff_price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_package_id` to the `lesson_usp_include` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_ups_id` to the `lesson_usp_include` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."lesson_packege" DROP CONSTRAINT "lesson_packege_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" DROP CONSTRAINT "lesson_ups_tariff_price_lessonTariffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" DROP CONSTRAINT "lesson_ups_tariff_price_lesson_packege_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_usp_include" DROP CONSTRAINT "lesson_usp_include_ups_id_fkey";

-- AlterTable
ALTER TABLE "public"."lesson_ups_tariff_price" DROP COLUMN "lessonTariffId",
ADD COLUMN     "lesson_tariffId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."lesson_usp_include" DROP COLUMN "ups_id",
ADD COLUMN     "lesson_package_id" INTEGER NOT NULL,
ADD COLUMN     "lesson_ups_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."lesson_packege";

-- CreateTable
CREATE TABLE "public"."lesson_package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_package_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_lesson_ups_id_fkey" FOREIGN KEY ("lesson_ups_id") REFERENCES "public"."lesson_usp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_lesson_package_id_fkey" FOREIGN KEY ("lesson_package_id") REFERENCES "public"."lesson_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_packege_id_fkey" FOREIGN KEY ("lesson_packege_id") REFERENCES "public"."lesson_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_tariffId_fkey" FOREIGN KEY ("lesson_tariffId") REFERENCES "public"."lesson_tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_package" ADD CONSTRAINT "lesson_package_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
