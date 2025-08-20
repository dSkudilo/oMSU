-- DropForeignKey
ALTER TABLE "public"."lesson_package" DROP CONSTRAINT "lesson_package_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" DROP CONSTRAINT "lesson_ups_tariff_price_lesson_packege_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" DROP CONSTRAINT "lesson_ups_tariff_price_lesson_tariffId_fkey";

-- AlterTable
ALTER TABLE "public"."lesson_package" ALTER COLUMN "lesson_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."lesson_ups_tariff_price" ALTER COLUMN "lesson_packege_id" DROP NOT NULL,
ALTER COLUMN "lesson_tariffId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_packege_id_fkey" FOREIGN KEY ("lesson_packege_id") REFERENCES "public"."lesson_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_tariffId_fkey" FOREIGN KEY ("lesson_tariffId") REFERENCES "public"."lesson_tariffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_package" ADD CONSTRAINT "lesson_package_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
