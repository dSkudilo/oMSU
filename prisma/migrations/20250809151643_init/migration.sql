/*
  Warnings:

  - You are about to drop the `PersonelLessonUSP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PersonelLesson LessonSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PersonelLesson LessonTariff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `personel_lessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PersonelLessonUSP" DROP CONSTRAINT "PersonelLessonUSP_personel_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PersonelLessonUSP" DROP CONSTRAINT "PersonelLessonUSP_personel_ups_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PersonelLesson LessonSubject" DROP CONSTRAINT "_PersonelLesson LessonSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PersonelLesson LessonSubject" DROP CONSTRAINT "_PersonelLesson LessonSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PersonelLesson LessonTariff" DROP CONSTRAINT "_PersonelLesson LessonTariff_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PersonelLesson LessonTariff" DROP CONSTRAINT "_PersonelLesson LessonTariff_B_fkey";

-- DropTable
DROP TABLE "public"."PersonelLessonUSP";

-- DropTable
DROP TABLE "public"."_PersonelLesson LessonSubject";

-- DropTable
DROP TABLE "public"."_PersonelLesson LessonTariff";

-- DropTable
DROP TABLE "public"."personel_lessons";

-- CreateTable
CREATE TABLE "public"."lessons" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_usp_include" (
    "id" SERIAL NOT NULL,
    "has" BOOLEAN NOT NULL,
    "lesson_id" INTEGER NOT NULL,
    "ups_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_usp_include_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_ups_tariff_price" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "lesson_ups_include_id" INTEGER NOT NULL,
    "lessonTariffId" INTEGER NOT NULL,

    CONSTRAINT "lesson_ups_tariff_price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_Lesson LessonSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Lesson LessonSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_Lesson LessonTariff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Lesson LessonTariff_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Lesson LessonSubject_B_index" ON "public"."_Lesson LessonSubject"("B");

-- CreateIndex
CREATE INDEX "_Lesson LessonTariff_B_index" ON "public"."_Lesson LessonTariff"("B");

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_usp_include" ADD CONSTRAINT "lesson_usp_include_ups_id_fkey" FOREIGN KEY ("ups_id") REFERENCES "public"."lesson_usp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lesson_ups_include_id_fkey" FOREIGN KEY ("lesson_ups_include_id") REFERENCES "public"."lesson_usp_include"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson_ups_tariff_price" ADD CONSTRAINT "lesson_ups_tariff_price_lessonTariffId_fkey" FOREIGN KEY ("lessonTariffId") REFERENCES "public"."lesson_tariffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Lesson LessonSubject" ADD CONSTRAINT "_Lesson LessonSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Lesson LessonSubject" ADD CONSTRAINT "_Lesson LessonSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."lesson_subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Lesson LessonTariff" ADD CONSTRAINT "_Lesson LessonTariff_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Lesson LessonTariff" ADD CONSTRAINT "_Lesson LessonTariff_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."lesson_tariffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
