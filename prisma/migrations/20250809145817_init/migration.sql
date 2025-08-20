/*
  Warnings:

  - You are about to drop the column `lessonUspId` on the `PersonelLessonUSP` table. All the data in the column will be lost.
  - You are about to drop the column `personelLessonId` on the `PersonelLessonUSP` table. All the data in the column will be lost.
  - Added the required column `personel_lesson_id` to the `PersonelLessonUSP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personel_ups_id` to the `PersonelLessonUSP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PersonelLessonUSP" DROP CONSTRAINT "PersonelLessonUSP_lessonUspId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PersonelLessonUSP" DROP CONSTRAINT "PersonelLessonUSP_personelLessonId_fkey";

-- DropIndex
DROP INDEX "public"."PersonelLessonUSP_personelLessonId_lessonUspId_key";

-- AlterTable
ALTER TABLE "public"."PersonelLessonUSP" DROP COLUMN "lessonUspId",
DROP COLUMN "personelLessonId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "personel_lesson_id" INTEGER NOT NULL,
ADD COLUMN     "personel_ups_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."lesson_usp" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."PersonelLessonUSP" ADD CONSTRAINT "PersonelLessonUSP_personel_lesson_id_fkey" FOREIGN KEY ("personel_lesson_id") REFERENCES "public"."personel_lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PersonelLessonUSP" ADD CONSTRAINT "PersonelLessonUSP_personel_ups_id_fkey" FOREIGN KEY ("personel_ups_id") REFERENCES "public"."lesson_usp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
