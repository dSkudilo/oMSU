import { Module } from '@nestjs/common';
import { LessonSubjectService } from './lesson-subject.service';
import { LessonSubjectController } from './lesson-subject.controller';

@Module({
  controllers: [LessonSubjectController],
  providers: [LessonSubjectService],
})
export class LessonSubjectModule {}
