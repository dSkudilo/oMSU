import { Module } from '@nestjs/common';
import { LessonTariffService } from './lesson-tariff.service';
import { LessonTariffController } from './lesson-tariff.controller';

@Module({
  controllers: [LessonTariffController],
  providers: [LessonTariffService],
})
export class LessonTariffModule {}
