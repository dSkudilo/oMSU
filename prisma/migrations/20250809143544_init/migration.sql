-- CreateTable
CREATE TABLE "public"."lesson_usp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "lesson_usp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PersonelLessonUSP" (
    "id" SERIAL NOT NULL,
    "personelLessonId" INTEGER NOT NULL,
    "lessonUspId" INTEGER NOT NULL,
    "has" BOOLEAN NOT NULL,

    CONSTRAINT "PersonelLessonUSP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonelLessonUSP_personelLessonId_lessonUspId_key" ON "public"."PersonelLessonUSP"("personelLessonId", "lessonUspId");

-- AddForeignKey
ALTER TABLE "public"."PersonelLessonUSP" ADD CONSTRAINT "PersonelLessonUSP_personelLessonId_fkey" FOREIGN KEY ("personelLessonId") REFERENCES "public"."personel_lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PersonelLessonUSP" ADD CONSTRAINT "PersonelLessonUSP_lessonUspId_fkey" FOREIGN KEY ("lessonUspId") REFERENCES "public"."lesson_usp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
