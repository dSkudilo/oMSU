import { Module } from '@nestjs/common';
import { RoomsService } from '@/src/modules/room/room.service';
import { RoomsGateway } from '@/src/modules/room/room.gateway';
import { RoomController } from '@/src/modules/room/room.controller';

@Module({
  controllers: [RoomController],
  providers: [RoomsService, RoomsGateway],
})
export class RoomModule {}
