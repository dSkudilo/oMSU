import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from '../shared/utils/is-dev.utils';
import { RedisModule } from './redis/redis.module';
import { AccountModule } from '../modules/auth/account/account.module';
import { CoreController } from './core.controller';
import { SessionModule } from '../modules/auth/session/session.module';
import { StudentModule } from '@/src/modules/students/student.module';
import { LessonSubjectModule } from '@/src/modules/lesson-subject/lesson-subject.module';
import { LessonTariffModule } from '@/src/modules/lesson-tariff/lesson-tariff.module';
import { LessonUspModule } from '@/src/modules/lesson-usp/lesson-usp.module';
import { LessonModule } from '@/src/modules/lesson/lesson.module';
import { RoomModule } from '@/src/modules/room/room.module';
import { RoomsGateway } from '@/src/modules/room/room.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    RedisModule,
    PrismaModule,
    AccountModule,
    SessionModule,
    StudentModule,
    LessonSubjectModule,
    LessonTariffModule,
    LessonUspModule,
    LessonModule,
    RoomModule,
    RoomsGateway,
  ],
  controllers: [CoreController],
  providers: [],
})
export class CoreModule {}
