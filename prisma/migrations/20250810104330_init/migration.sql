-- DropForeignKey
ALTER TABLE "public"."lesson_usp_include" DROP CONSTRAINT "lesson_usp_include_lesson_package_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."lesson_usp_include" DROP CONSTRAINT "lesson_usp_include_lesson_ups_id_fkey";

-- AlterTable
ALTER TABLE "public"."lesson_usp_include" ALTER COLUMN "lesson_package_id" DROP NOT NULL,
ALTER COLUMN "lesson_ups_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_lesson_ups_id_fkey" FOREIGN KEY ("lesson_ups_id") REFERENCES "public"."lesson_usp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_lesson_package_id_fkey" FOREIGN KEY ("lesson_package_id") REFERENCES "public"."lesson_package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
