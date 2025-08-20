import { Module } from '@nestjs/common';
import { LessonUspService } from './lesson-usp.service';
import { LessonUspController } from './lesson-usp.controller';

@Module({
  controllers: [LessonUspController],
  providers: [LessonUspService],
})
export class LessonUspModule {}
