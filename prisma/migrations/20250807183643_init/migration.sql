-- CreateTable
CREATE TABLE "public"."lesson_subjects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."lesson_tariffs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_tariffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."personel_lessons" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personel_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PersonelLesson LessonSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonelLesson LessonSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_PersonelLesson LessonTariff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonelLesson LessonTariff_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PersonelLesson LessonSubject_B_index" ON "public"."_PersonelLesson LessonSubject"("B");

-- CreateIndex
CREATE INDEX "_PersonelLesson LessonTariff_B_index" ON "public"."_PersonelLesson LessonTariff"("B");

-- AddForeignKey
ALTER TABLE "public"."_PersonelLesson LessonSubject" ADD CONSTRAINT "_PersonelLesson LessonSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."lesson_subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PersonelLesson LessonSubject" ADD CONSTRAINT "_PersonelLesson LessonSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."personel_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PersonelLesson LessonTariff" ADD CONSTRAINT "_PersonelLesson LessonTariff_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."lesson_tariffs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PersonelLesson LessonTariff" ADD CONSTRAINT "_PersonelLesson LessonTariff_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."personel_lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
